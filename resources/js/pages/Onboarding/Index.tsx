import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

import { Step, OnboardingFormData } from '@/types/onboarding';
import Profile from './components/profile';
import Workspace from './components/workspace';
import EmailSync from './components/emailsync';
import Customize from './components/customize';
import Collaborate from './components/collaborate';
import { CRMPreview, CollabPreview } from './components/preview-panels';
import OnboardingLayout from '@/layouts/onboarding-layout';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// ─── Default form state ────────────────────────────────────────────────────────

const defaultFormData: OnboardingFormData = {
    first_name: '',
    last_name: '',
    email: '',
    avatar: null,
    subscribe_updates: false,
    company_logo: null,
    company_name: '',
    workspace_handle: '',
    billing_country: 'United States of America',
    email_sync: 'subject_metadata',
    use_cases: ['Sales Pipeline'],
    current_task: 'Tracking leads',
    invite_emails: ['', ''],
    password: '',
    password_confirmation: '',
};

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function OnboardingIndex() {
    const [step, setStep] = useState<Step>(1);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<OnboardingFormData>(defaultFormData);

    const update = (key: keyof OnboardingFormData, value: any) =>
        setFormData(prev => ({ ...prev, [key]: value }));

    const goNext = () => setStep(s => Math.min(s + 1, 5) as Step);
    const goBack = () => {
        setErrors({});
        setStep(s => Math.max(s - 1, 1) as Step);
    };

    const handleSubmit = () => {
        setProcessing(true);
        setErrors({});

        router.post(
            '/onboarding',
            {
                organization_name: formData.company_name || 'My Workspace',
                slug: formData.workspace_handle || 'my-workspace',
                admin_name: `${formData.first_name} ${formData.last_name}`.trim() || 'User',
                email: formData.email,
                password: formData.password || 'Password123!',
                password_confirmation: formData.password_confirmation || 'Password123!',
                plan: 'free',
            },
            {
                onError: errs => { setErrors(errs); setProcessing(false); },
                onFinish: () => setProcessing(false),
            },
        );
    };

    const STEP_LABELS: Record<Step, string> = {
        1: 'Your profile',
        2: 'Workspace',
        3: 'Email & calendar',
        4: 'Customize',
        5: 'Invite team',
    };

    return (
        <>
            <Head title="Setup your workspace – Crmsales" />

            {/* Outer centering wrapper — OnboardingLayout provides the page shell */}
            <div className="flex flex-1 items-center justify-center px-4">
                <Card className="w-full max-w-6xl overflow-hidden p-0 shadow-xl">
                    <CardContent className="grid p-0 md:grid-cols-[460px_1fr]">

                        {/* ── LEFT: Form panel ───────────────────────────── */}
                        <div className="relative flex flex-col border-r border-border bg-background">

                            {/* Back button */}
                            {step > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={goBack}
                                    className="absolute left-3 top-4 z-10 h-8 w-8"
                                    aria-label="Go back"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            )}

                            {/* Step header */}
                            <div className="px-8 pt-8 pb-4">
                                {/* Progress */}
                                <div className="mb-4 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground">
                                            Step {step} of 5 — <span className="font-medium text-foreground">{STEP_LABELS[step]}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">{step * 20}%</p>
                                    </div>
                                    <Progress value={step * 20} className="h-1" />
                                </div>
                            </div>

                            {/* Scrollable step content */}
                            <ScrollArea className="flex-1 px-8 pb-8">
                                {step === 1 && (
                                    <Profile formData={formData} update={update} onNext={goNext} />
                                )}
                                {step === 2 && (
                                    <Workspace formData={formData} update={update} onNext={goNext} errors={errors} />
                                )}
                                {step === 3 && (
                                    <EmailSync formData={formData} update={update} onNext={goNext} />
                                )}
                                {step === 4 && (
                                    <Customize formData={formData} update={update} onNext={goNext} />
                                )}
                                {step === 5 && (
                                    <Collaborate
                                        formData={formData}
                                        update={update}
                                        onSubmit={handleSubmit}
                                        processing={processing}
                                        errors={errors}
                                    />
                                )}
                            </ScrollArea>
                        </div>

                        {/* ── RIGHT: Live CRM preview ────────────────────── */}
                        <div className="relative hidden min-h-[580px] bg-muted/30 md:flex">
                            {step === 5
                                ? <CollabPreview />
                                : <CRMPreview step={step} formData={formData} />
                            }
                        </div>

                    </CardContent>
                </Card>
            </div>
        </>
    );
}

OnboardingIndex.layout = (page: React.ReactNode) => (
    <OnboardingLayout>{page}</OnboardingLayout>
);