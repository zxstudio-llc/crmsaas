import React from 'react';

export type Step = 1 | 2 | 3 | 4 | 5;

export interface OnboardingFormData {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string | null;
    subscribe_updates: boolean;
    company_logo: string | null;
    company_name: string;
    workspace_handle: string;
    billing_country: string;
    email_sync: 'subject_metadata' | 'metadata_only' | 'none';
    use_cases: string[];
    current_task: string;
    invite_emails: string[];
    password: string;
    password_confirmation: string;
}

export const COUNTRIES = [
    'United States of America', 'United Kingdom', 'France', 'Germany',
    'Canada', 'Australia', 'Spain', 'Italy', 'Netherlands', 'Sweden',
    'Norway', 'Denmark', 'Switzerland', 'Belgium', 'Portugal', 'Brazil',
    'Mexico', 'Argentina', 'Colombia', 'Chile', 'Japan', 'South Korea',
    'Singapore', 'India', 'Other',
];

export const USE_CASES = [
    'Sales Pipeline', 'Lead Management', 'Marketing Automation', 'Customer Success',
    'Deal Tracking', 'Email Campaigns', 'Revenue Intelligence', 'Recruiting',
    'Fundraising', 'Other',
];

export const CURRENT_TASKS = [
    'Tracking leads', 'Closing deals', 'Managing contacts', 'Other',
];

export const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid hsl(var(--border))',
    borderRadius: 'calc(var(--radius) - 2px)',
    fontSize: '14px',
    color: 'hsl(var(--foreground))',
    outline: 'none',
    background: 'hsl(var(--background))',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
};

export const btnPrimary: React.CSSProperties = {
    width: '100%',
    padding: '9px 16px',
    background: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none',
    borderRadius: 'calc(var(--radius) - 2px)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '16px',
    fontFamily: 'inherit',
    transition: 'opacity 0.15s',
};

export const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 12px',
    borderRadius: '999px',
    border: `1px solid ${active ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
    background: active ? 'hsl(var(--primary) / 0.08)' : 'hsl(var(--background))',
    color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
    lineHeight: '1.4',
});