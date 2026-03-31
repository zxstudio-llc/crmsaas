"use client"

import React, { useState } from 'react';
import { OnboardingFormData } from '@/types/onboarding';
import { PlusIcon, Trash2Icon, Eye, EyeOff } from "lucide-react";
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
    FieldDescription,
    FieldTitle
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
    formData: OnboardingFormData;
    update: (key: keyof OnboardingFormData, value: any) => void;
    onSubmit: () => void;
    processing: boolean;
    errors: Record<string, string>;
    plans?: any[];
}

function PasswordInput({
    id,
    value,
    onChange,
    placeholder,
}: {
    id: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <Input
                id={id}
                type={show ? 'text' : 'password'}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="pr-10 h-10"
            />
            <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
            >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    );
}

export default function Collaborate({ formData, update, onSubmit, processing, errors, plans = [] }: Props) {
    const [showInvites, setShowInvites] = useState(
        formData.invite_emails.some(email => email.trim() !== '')
    );

    const addEmailField = () => {
        if (!showInvites) setShowInvites(true);
        update('invite_emails', [...formData.invite_emails, '']);
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

    const fieldError = (key: string) =>
        errors[key] ? <p className="text-xs text-destructive mt-1 font-medium">{errors[key]}</p> : null;

    const globalErrors = Object.entries(errors)
        .filter(([k]) => !['email', 'password', 'password_confirmation', 'slug', 'organization_name', 'admin_name', 'plan_id'].includes(k))
        .map(([, v]) => v);

    const isLaunchDisabled = processing || !formData.password || !formData.password_confirmation || !formData.plan_id;

    return (
        <FieldSet>
            <FieldGroup className="space-y-2">
                {/* Header */}
                <FieldSet>
                    <FieldLegend className="text-xl font-semibold tracking-tight">
                        Almost there — secure your account
                    </FieldLegend>
                    <FieldDescription className="text-sm text-muted-foreground">
                        Select your plan, set a password for your account and optionally invite your team to start collaborating.
                    </FieldDescription>
                </FieldSet>
                <FieldSet>
                    <Accordion type="single" collapsible defaultValue="item-plan" className="w-full space-y-2">
                        {/* 1 Subscription Plan */}
                        <AccordionItem value="item-plan" className="border-b-0">
                            <AccordionTrigger className="hover:no-underline py-2">
                                <div className="flex items-center gap-3 text-left">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary border border-primary/20">
                                        1
                                    </span>
                                    <span className="text-sm font-bold tracking-tight">Select your plan</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6">
                                <FieldGroup className="gap-4 pt-2">
                                    <Field>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {plans?.map(plan => (
                                                <div
                                                    key={plan.id}
                                                    onClick={() => update('plan_id', plan.id)}
                                                    className={`cursor-pointer rounded-xl border p-4 transition-all ${formData.plan_id === plan.id
                                                            ? 'border-primary ring-1 ring-primary bg-primary/5'
                                                            : 'border-border hover:border-primary/50'
                                                        }`}
                                                >
                                                    <div className="font-semibold text-lg">{plan.name}</div>
                                                    <div className="text-xl font-bold mt-1">${plan.price} <span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                                                    <p className="text-xs text-muted-foreground mt-2">{plan.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {fieldError('plan_id')}
                                    </Field>
                                </FieldGroup>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 2 Security Credentials */}
                        <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="hover:no-underline py-2">
                                <div className="flex items-center gap-3 text-left">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-[11px] font-bold text-foreground">
                                        2
                                    </span>
                                    <span className="text-sm font-bold tracking-tight">Security Credentials</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6">
                                <FieldGroup className="gap-4 pt-2">
                                    <Field>
                                        <Label htmlFor="password">Password</Label>
                                        <PasswordInput
                                            id="password"
                                            value={formData.password}
                                            onChange={v => update('password', v)}
                                            placeholder="Min. 8 characters"
                                        />
                                        {fieldError('password')}
                                    </Field>

                                    <Field>
                                        <Label htmlFor="password_confirmation">Confirm password</Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={v => update('password_confirmation', v)}
                                            placeholder="Repeat your password"
                                        />
                                        {fieldError('password_confirmation')}
                                    </Field>
                                </FieldGroup>
                            </AccordionContent>
                        </AccordionItem>

                        {/* 2 Team Collaboration */}
                        <AccordionItem value="item-2" className="border-b-0">
                            <AccordionTrigger className="hover:no-underline py-2">
                                <div className="flex items-center gap-3 text-left">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-[11px] font-bold text-foreground">
                                        2
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold tracking-tight">Team Collaboration</span>
                                        <span className="text-[10px] text-muted-foreground font-normal">(Optional)</span>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6">
                                <div>
                                    {!showInvites ? (
                                        <Empty className="flex-none border border-dashed rounded-lg bg-background/50">
                                            <EmptyHeader>
                                                <EmptyMedia>
                                                    <AvatarGroup className="grayscale opacity-60">
                                                        <Avatar className="border-2 border-background h-8 w-8">
                                                            <AvatarImage src="https://github.com/shadcn.png" />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <Avatar className="border-2 border-background h-8 w-8">
                                                            <AvatarImage src="https://github.com/maxleiter.png" />
                                                            <AvatarFallback>LR</AvatarFallback>
                                                        </Avatar>
                                                    </AvatarGroup>
                                                </EmptyMedia>
                                                <EmptyTitle className="text-xs">No teammates yet</EmptyTitle>
                                            </EmptyHeader>
                                            <EmptyContent>
                                                <Button size="sm" onClick={addEmailField} variant="outline" className="h-7 text-xs gap-2">
                                                    <PlusIcon className="w-3 h-3" />
                                                    Add members
                                                </Button>
                                            </EmptyContent>
                                        </Empty>
                                    ) : (
                                        <FieldGroup className="gap-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Teammate Details</span>
                                                <Button type="button" variant="ghost" size="sm" onClick={addEmailField} className="h-7 text-xs gap-1 text-primary">
                                                    <PlusIcon className="w-3 h-3" /> Add more
                                                </Button>
                                            </div>
                                            {formData.invite_emails.map((email, i) => (
                                                <Field key={i}>
                                                    <div className="flex gap-2">
                                                        <Input
                                                            type="email"
                                                            placeholder="name@company.com"
                                                            value={email || ''}
                                                            onChange={e => updateEmail(i, e.target.value)}
                                                            className="h-9 flex-1 bg-background"
                                                        />
                                                        <Select defaultValue="member">
                                                            <SelectTrigger className="w-[100px] h-9 text-xs bg-background">
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
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </FieldSet>

                {/* Global Errors */}
                {globalErrors.length > 0 && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                        {globalErrors.map((err, i) => (
                            <p key={i} className="text-xs text-destructive font-medium">{err}</p>
                        ))}
                    </div>
                )}

                {/* Final Actions */}
                <FieldGroup className="gap-3">
                    <Field>
                        <Button
                            onClick={onSubmit}
                            disabled={isLaunchDisabled}

                        >
                            {processing ? 'Finalizing...' : 'Launch my workspace'}
                        </Button>

                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={isLaunchDisabled}
                            className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                        >
                            {showInvites ? 'Invite later & finish' : 'Skip invites & finish'}
                        </button>
                    </Field>
                    <p className="text-[11px] leading-relaxed text-muted-foreground/60 text-center px-6">
                        By launching, you agree to our{' '}
                        <a href="/terms" className="underline hover:text-foreground">terms</a>.
                        Authorized business use only.
                    </p>
                </FieldGroup>
            </FieldGroup>
        </FieldSet>
    );
}