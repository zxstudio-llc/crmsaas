import React, { useRef } from 'react';
import { OnboardingFormData, inputStyle, btnPrimary } from '@/types/onboarding';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, Refresh03Icon, ScanImageIcon } from '@hugeicons/core-free-icons';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldSet, FieldLegend, FieldDescription, FieldSeparator, FieldLabel, Field } from '@/components/ui/field';

interface Props {
    formData: OnboardingFormData;
    update: (key: keyof OnboardingFormData, value: any) => void;
    onNext: () => void;
}

export default function Profile({ formData, update, onNext }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => update('avatar', ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    return (
        <FieldGroup>
            {/* Cabecera del Formulario */}
            <FieldSet>
                <FieldLegend className="text-xl font-semibold tracking-tight">
                    Let's get to know you
                </FieldLegend>
            </FieldSet>

            {/* Sección de Avatar - Integrada en FieldSet */}
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <div className="flex items-center gap-4">
                            {/* Contenedor de Imagen (Mantiene tu diseño original) */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-slate-200 bg-slate-50 transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-95 group"
                            >
                                {formData.avatar ? (
                                    <>
                                        <img src={formData.avatar} className="h-full w-full object-cover" alt="avatar" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <HugeiconsIcon icon={Refresh03Icon} size={24} className="text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <HugeiconsIcon icon={ScanImageIcon} size={24} className="text-slate-400 group-hover:text-slate-600" />
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <FieldLabel className="text-sm font-medium">Profile picture</FieldLabel>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-8 gap-2 px-3 text-xs font-semibold"
                                    >
                                        <HugeiconsIcon icon={formData.avatar ? Refresh03Icon : ScanImageIcon} size={16} />
                                        {formData.avatar ? 'Change' : 'Upload'}
                                    </Button>
                                    {formData.avatar && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => update('avatar', null)}
                                            className="h-8 gap-1.5 px-3 text-xs font-medium text-red-500 hover:bg-red-50"
                                        >
                                            <HugeiconsIcon icon={Delete02Icon} size={16} />
                                            Remove
                                        </Button>
                                    )}
                                </div>
                                <FieldDescription className="text-[11px] leading-tight">
                                    PNG or JPEG, max. 10MB.
                                </FieldDescription>
                            </div>
                        </div>
                        <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg" className="hidden" onChange={handleUpload} />
                    </Field>
                </FieldGroup>
            </FieldSet>

            {/* Campos de Texto */}
            <FieldSet>
                <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="first_name">First name</FieldLabel>
                            <Input
                                id="first_name"
                                placeholder="e.g. Jane"
                                value={formData.first_name}
                                onChange={e => update('first_name', e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="last_name">Last name</FieldLabel>
                            <Input
                                id="last_name"
                                placeholder="e.g. Smith"
                                value={formData.last_name}
                                onChange={e => update('last_name', e.target.value)}
                            />
                        </Field>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="email">Work email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="jane@company.com"
                            value={formData.email}
                            onChange={e => update('email', e.target.value)}
                            className="bg-muted/50 focus:bg-background"
                        />
                    </Field>
                </FieldGroup>
            </FieldSet>

            {/* Toggle de Suscripción */}
            <FieldSet>
                <FieldGroup>
                    <Field orientation="horizontal" className="justify-between items-center gap-4">
                        <div className="space-y-0.5">
                            <FieldLabel htmlFor="subscribe" className="cursor-pointer">
                                Subscribe to product updates
                            </FieldLabel>
                            <FieldDescription>
                                Get the latest on AI features and sales tips.
                            </FieldDescription>
                        </div>
                        <Switch
                            id="subscribe"
                            checked={formData.subscribe_updates}
                            onCheckedChange={v => update('subscribe_updates', v)}
                        />
                    </Field>
                </FieldGroup>
            </FieldSet>

            {/* Footer del Formulario */}
            <FieldGroup className="flex-row justify-end gap-3 pt-4">
                <Button onClick={onNext} className="w-full sm:w-full">
                    Continue
                </Button>
            </FieldGroup>
        </FieldGroup>
    );
}