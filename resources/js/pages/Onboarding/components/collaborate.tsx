"use client"

import React, { useState } from 'react';
import { OnboardingFormData } from '@/types/onboarding';
import { PlusIcon, Trash2Icon } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldDescription
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    formData: OnboardingFormData;
    update: (key: keyof OnboardingFormData, value: any) => void;
    onSubmit: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export default function Collaborate({ formData, update, onSubmit, processing, errors }: Props) {
    const [showInvites, setShowInvites] = useState(
        formData.invite_emails.some(email => email.trim() !== '')
    );

    const addEmailField = () => {
        if (!showInvites) setShowInvites(true);

        // evita duplicar "" inicial innecesario
        if (formData.invite_emails.length === 0) {
            update('invite_emails', ['']);
        } else {
            update('invite_emails', [...formData.invite_emails, '']);
        }
    };

    const updateEmail = (i: number, val: string) => {
        const updated = [...formData.invite_emails];
        updated[i] = val;
        update('invite_emails', updated);
    };

    const removeEmail = (i: number) => {
        const updated = formData.invite_emails.filter((_, index) => index !== i);
        update('invite_emails', updated);
        if (updated.length === 0) setShowInvites(false);
    };

    const hasValidEmails = formData.invite_emails.some(
        email => email.trim() !== ''
    );

    const errorList = Object.values(errors);

    return (
        <FieldSet>
            <FieldGroup>
                {/* Header */}
                <FieldSet>
                    <FieldLegend className="text-xl font-semibold tracking-tight">
                        Collaborate with your team
                    </FieldLegend>
                    <FieldDescription className="mt-1 text-sm text-muted-foreground">
                        Shared deals, activities, and AI insights for everyone. Freshsales is built for teams working together.
                    </FieldDescription>
                </FieldSet>

                <FieldSeparator />

                {/* Conditional Content: Empty State or Invite List */}
                {!showInvites ? (
                    <Empty className="flex-none border py-8 rounded-xl bg-muted/20">
                        <EmptyHeader>
                            <EmptyMedia>
                                <AvatarGroup className="grayscale opacity-70">
                                    <Avatar className="border-2 border-background">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="border-2 border-background">
                                        <AvatarImage src="https://github.com/maxleiter.png" />
                                        <AvatarFallback>LR</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="border-2 border-background">
                                        <AvatarImage src="https://github.com/evilrabbit.png" />
                                        <AvatarFallback>ER</AvatarFallback>
                                    </Avatar>
                                </AvatarGroup>
                            </EmptyMedia>
                            <EmptyTitle className="text-base">No Team Members</EmptyTitle>
                            <EmptyDescription className="text-xs">
                                Invite your team to collaborate on this workspace.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button size="sm" onClick={addEmailField} variant="secondary" className="gap-2">
                                <PlusIcon className="w-4 h-4" />
                                Invite Members
                            </Button>
                        </EmptyContent>
                    </Empty>
                ) : (
                    <FieldSet>
                        <div className="flex items-center justify-between mb-3">
                            <FieldLabel className="text-sm font-medium text-foreground">Invites</FieldLabel>
                            <Button type="button" variant="ghost" size="sm" onClick={addEmailField} className="h-7 text-xs gap-1">
                                <PlusIcon className="w-3 h-3" /> Add more
                            </Button>
                        </div>
                        <FieldGroup className="gap-3">
                            {formData.invite_emails.map((email, i) => (
                                <Field key={i}>
                                    <div className="flex gap-2">
                                        <Input
                                            type="email"
                                            placeholder="colleague@company.com"
                                            value={email}
                                            onChange={e => updateEmail(i, e.target.value)}
                                            className="h-9 flex-1"
                                        />
                                        <Select defaultValue="member">
                                            <SelectTrigger className="w-[100px] h-9 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="member">Member</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeEmail(i)}
                                            className="h-9 w-9 text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2Icon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Field>
                            ))}
                        </FieldGroup>
                    </FieldSet>
                )}

                {/* Errors Display */}
                {errorList.length > 0 && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                        {errorList.map((err, i) => (
                            <p key={i} className="text-xs text-destructive font-medium">{err}</p>
                        ))}
                    </div>
                )}

                <FieldSeparator />

                {/* Actions */}
                <FieldGroup>
                    <Button
                        onClick={onSubmit}
                        disabled={processing || !hasValidEmails}
                        className="w-full sm:w-full"
                    >
                        {processing ? 'Setting up your workspace...' : 'Send invites & finish'}
                    </Button>

                    <Button
                        type="button"
                        onClick={onSubmit}
                        disabled={processing}
                        className="text-sm transition-colors"
                    >
                        Skip for now
                    </Button>
                </FieldGroup>

                <p className="text-[11px] leading-relaxed text-muted-foreground/70 text-center px-4">
                    By finishing, you agree to our{' '}
                    <a href="/terms" className="underline hover:text-foreground">terms</a>.
                    Services are for business users only.
                </p>
            </FieldGroup>
        </FieldSet>
    );
}