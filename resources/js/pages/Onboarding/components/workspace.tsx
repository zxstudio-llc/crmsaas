import React, { useRef } from 'react';
import { OnboardingFormData, COUNTRIES } from '@/types/onboarding';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Refresh03Icon,
    ScanImageIcon,
    Delete02Icon,
    Building01Icon
} from "@hugeicons/core-free-icons";

interface Props {
    formData: OnboardingFormData;
    update: (key: keyof OnboardingFormData, value: any) => void;
    onNext: () => void;
    errors: Record<string, string>;
}

export default function Workspace({ formData, update, onNext, errors }: Props) {
    const logoInputRef = useRef<HTMLInputElement>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => update('company_logo', ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleCompanyNameChange = (value: string) => {
        update('company_name', value);
        update('workspace_handle', value.toLowerCase().replace(/[^a-z0-9]/g, ''));
    };

    return (
        <div className="w-full">
            <FieldGroup>
                {/* Header */}
                <FieldSet>
                    <FieldLegend className="text-xl font-semibold tracking-tight">
                        Create your workspace
                    </FieldLegend>
                </FieldSet>

                {/* Company Logo Section */}
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <div className="flex items-center gap-4">
                                <div
                                    onClick={() => logoInputRef.current?.click()}
                                    className="relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50 transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-95 group"
                                >
                                    {formData.company_logo ? (
                                        <>
                                            <img src={formData.company_logo} className="h-full w-full object-cover" alt="logo" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <HugeiconsIcon icon={Refresh03Icon} size={24} className="text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <HugeiconsIcon icon={Building01Icon} size={24} className="text-slate-400 group-hover:text-slate-600" />
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <FieldLabel className="text-sm font-medium">Company logo</FieldLabel>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => logoInputRef.current?.click()}
                                            className="h-8 gap-2 px-3 text-xs font-semibold"
                                        >
                                            <HugeiconsIcon icon={formData.company_logo ? Refresh03Icon : ScanImageIcon} size={16} />
                                            {formData.company_logo ? 'Change' : 'Upload'}
                                        </Button>
                                        {formData.company_logo && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => update('company_logo', null)}
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
                            <input ref={logoInputRef} type="file" accept=".png,.jpg,.jpeg" className="hidden" onChange={handleLogoUpload} />
                        </Field>
                    </FieldGroup>
                </FieldSet>

                {/* Company Details Section */}
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="company_name">Company name</FieldLabel>
                            <Input
                                id="company_name"
                                placeholder="e.g. Acme Corp"
                                value={formData.company_name}
                                onChange={e => handleCompanyNameChange(e.target.value)}
                                className={errors.organization_name ? "border-destructive" : ""}
                            />
                            {errors.organization_name && (
                                <p className="text-xs text-destructive">{errors.organization_name}</p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="workspace_handle">Workspace URL</FieldLabel>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-sm text-muted-foreground pointer-events-none">
                                    app.crmsales.io/
                                </span>
                                <Input
                                    id="workspace_handle"
                                    className={`pl-[115px] ${errors.slug ? "border-destructive" : ""}`}
                                    value={formData.workspace_handle}
                                    onChange={e => update('workspace_handle', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                />
                            </div>
                            {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
                            <FieldDescription>Lowercase letters, numbers and dashes only.</FieldDescription>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="billing_country">Billing country</FieldLabel>
                            <Select
                                value={formData.billing_country}
                                onValueChange={(v) => update('billing_country', v)}
                            >
                                <SelectTrigger id="billing_country" className="w-full">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COUNTRIES.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                </FieldSet>

                {/* Actions */}
                {/* Footer del Formulario */}
                <FieldGroup className="flex-row justify-end gap-3 pt-4">
                    <Button onClick={onNext} className="w-full sm:w-full">
                        Continue
                    </Button>
                </FieldGroup>
            </FieldGroup>
        </div>
    );
}