import React from 'react';
import { OnboardingFormData } from '@/types/onboarding';
import { HugeiconsIcon } from '@hugeicons/react';
import { CircleLock02Icon, EdgeStyleIcon, Tick01Icon } from '@hugeicons/core-free-icons';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
    formData: OnboardingFormData;
    update: (key: keyof OnboardingFormData, value: any) => void;
    onNext: () => void;
}

export default function EmailSync({ formData, update, onNext }: Props) {
    return (
        <FieldSet>
            <FieldGroup>
                {/* Header Section */}
                <FieldSet>
                    <FieldLegend className="text-xl font-semibold tracking-tight">
                        Sync your email and calendar
                    </FieldLegend>
                    <FieldDescription className="text-sm text-muted-foreground">
                        Connect your inbox to instantly create profiles for your entire network.
                        {/* Benefits List */}
                        <ul className="flex flex-col">
                            {[
                                'Every interaction will be automatically sorted',
                                'Every profile enriched with hundreds of data points',
                                'Every record will always be up-to-date',
                            ].map(item => (
                                <li key={item} className="flex items-center text-sm text-muted-foreground">
                                    <HugeiconsIcon icon={Tick01Icon} size={18} strokeWidth={2} className="text-muted-foreground" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </FieldDescription>
                </FieldSet>

                {/* Privacy Options Section */}
                <FieldSet className="gap-2">
                    <FieldTitle className="text-sm font-medium">Privacy Settings</FieldTitle>
                    <RadioGroup
                        value={formData.email_sync}
                        onValueChange={(v) => update('email_sync', v)}
                    >
                        {/* Option 1: Subject and Metadata */}
                        <FieldLabel
                            htmlFor="subject_metadata"
                            className="p-0 cursor-pointer rounded-xl border transition-all hover:bg-muted/50 data-[state=checked]:border-primary/40 data-[state=checked]:bg-primary/5"
                            data-state={formData.email_sync === 'subject_metadata' ? 'checked' : 'unchecked'}
                        >
                            <Field orientation="horizontal" className="items-center gap-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <HugeiconsIcon icon={EdgeStyleIcon} size={20} strokeWidth={1.5} />
                                </div>
                                <FieldContent>
                                    <FieldTitle>Subject line and metadata</FieldTitle>
                                    <FieldDescription className="text-sm text-muted-foreground leading-4">
                                        Subjects, participants, and timestamps are visible to your team. Email content stays private.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value="subject_metadata" id="subject_metadata" />
                            </Field>
                        </FieldLabel>

                        {/* Option 2: Metadata Only */}
                        <FieldLabel
                            htmlFor="metadata_only"
                            className="cursor-pointer rounded-xl border transition-all hover:bg-muted/50 data-[state=checked]:border-primary/40 data-[state=checked]:bg-primary/5"
                            data-state={formData.email_sync === 'metadata_only' ? 'checked' : 'unchecked'}
                        >
                            <Field orientation="horizontal" className="items-center gap-2">
                                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <HugeiconsIcon icon={EdgeStyleIcon} size={20} strokeWidth={1.5} className="opacity-40" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <HugeiconsIcon icon={CircleLock02Icon} size={16} strokeWidth={2} />
                                    </div>
                                </div>
                                <FieldContent>
                                    <FieldTitle>Metadata only</FieldTitle>
                                    <FieldDescription className="text-sm text-muted-foreground leading-4">
                                        Only participants and timestamps are shared. Subject lines are never visible to the team.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value="metadata_only" id="metadata_only" />
                            </Field>
                        </FieldLabel>
                    </RadioGroup>
                </FieldSet>

                {/* Connection Section */}
                <FieldSet className="gap-2">
                    <FieldGroup className="gap-2">
                        <Button variant="outline" className="h-11 w-full gap-2 font-semibold">
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
                                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                            </svg>
                            Connect Google account
                        </Button>
                        <Button variant="outline" className="h-11 w-full gap-2 font-semibold">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M4 4h7.5v7.5H4z" fill="#f35325" />
                                <path d="M12.5 4H20v7.5h-7.5z" fill="#81bc06" />
                                <path d="M4 12.5h7.5V20H4z" fill="#05a6f0" />
                                <path d="M12.5 12.5H20V20h-7.5z" fill="#ffba08" />
                            </svg>
                            Connect Microsoft account
                        </Button>
                    </FieldGroup>
                </FieldSet>

                {/* Footer Action */}
                <FieldGroup className="flex-row justify-end gap-3">
                    <Button onClick={onNext} className="w-full sm:w-full">
                        Continue without sync
                    </Button>
                </FieldGroup>
            </FieldGroup>
        </FieldSet>
    );
}