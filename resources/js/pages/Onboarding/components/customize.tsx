"use client"

import React from 'react';
import { OnboardingFormData, USE_CASES, CURRENT_TASKS } from '@/types/onboarding';
import { cn } from "@/lib/utils"
import { FieldSet, FieldGroup, FieldLegend, FieldDescription, FieldSeparator, FieldTitle } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

interface Props {
    formData: OnboardingFormData;
    update: (key: keyof OnboardingFormData, value: any) => void;
    onNext: () => void;
}

export default function Customize({ formData, update, onNext }: Props) {
    const toggleUseCase = (uc: string) => {
        update(
            'use_cases',
            formData.use_cases.includes(uc)
                ? formData.use_cases.filter(u => u !== uc)
                : [...formData.use_cases, uc],
        );
    };

    return (
        <FieldSet>
            <FieldGroup>
                {/* Header */}
                <FieldSet>
                    <FieldLegend className="text-xl font-semibold tracking-tight">
                        Help us customize your workspace
                    </FieldLegend>
                    <FieldDescription className="text-sm text-muted-foreground">
                        Crmsales adapts to how your team sells. Tell us your priorities and we'll configure the right pipeline templates for you.
                    </FieldDescription>
                </FieldSet>

                {/* Use cases - Selección Múltiple */}
                <FieldSet className="gap-2">
                    <FieldTitle className="text-sm font-medium">
                        What will you be using Crmsales for?
                    </FieldTitle>
                    <div className="flex flex-wrap gap-1">
                        {USE_CASES.map(uc => {
                            const isSelected = formData.use_cases.includes(uc);
                            return (
                                <Button
                                    key={uc}
                                    type="button"
                                    variant={isSelected ? "default" : "outline"}
                                    size="xs"
                                    onClick={() => toggleUseCase(uc)}
                                    className={cn(
                                        "h-8 rounded-full px-2 text-xs font-medium transition-all",
                                        !isSelected && "bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {uc}
                                </Button>
                            );
                        })}
                    </div>
                </FieldSet>

                {/* Current task - Selección Única */}
                <FieldSet className="gap-2">
                    <FieldTitle className="text-sm font-medium">
                        What are you working on right now?
                    </FieldTitle>
                    <div className="flex flex-wrap gap-1">
                        {CURRENT_TASKS.map(t => {
                            const isSelected = formData.current_task === t;
                            return (
                                <Button
                                    key={t}
                                    type="button"
                                    variant={isSelected ? "default" : "outline"}
                                    size="xs"
                                    onClick={() => update('current_task', t)}
                                    className={cn(
                                        "h-8 rounded-full px-2 text-xs font-medium transition-all",
                                        !isSelected && "bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {t}
                                </Button>
                            );
                        })}
                    </div>
                    <FieldDescription>
                        You can easily change these later from Settings → Customize.
                    </FieldDescription>
                </FieldSet>

                {/* Footer Action */}
                <FieldGroup>
                    <Button onClick={onNext} className="w-full sm:w-full">
                        Complete setup
                    </Button>

                    <Button
                        type="button"
                        onClick={onNext}
                        className="text-sm transition-colors"
                    >
                        Skip for now
                    </Button>
                </FieldGroup>
            </FieldGroup>
        </FieldSet>
    );
}