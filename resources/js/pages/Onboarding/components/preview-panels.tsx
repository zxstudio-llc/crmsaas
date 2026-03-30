import React from 'react';
import { Step, OnboardingFormData } from '@/types/onboarding';

interface CRMPreviewProps {
    step: Step;
    formData: OnboardingFormData;
}

// Blurred skeleton rows simulating a Freshsales pipeline list
function PipelineRows() {
    const rows = [
        { label: 'Sarah Mitchell · Acme Corp', stage: 'Demo Scheduled', value: '$24,000', dot: '#22c55e' },
        { label: 'James Okafor · TechBridge', stage: 'Proposal Sent', value: '$18,500', dot: '#f59e0b' },
        { label: 'Priya Nair · Growfast', stage: 'Negotiation', value: '$52,000', dot: '#3b82f6' },
        { label: 'Carlos Vega · NovaTech', stage: 'Qualified', value: '$9,800', dot: '#8b5cf6' },
        { label: 'Emma Torres · Bluewave', stage: 'New Lead', value: '$31,200', dot: '#6366f1' },
    ];

    return (
        <div className="flex flex-col divide-y divide-border/50">
            {rows.map((row, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground shrink-0">
                        {row.label.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex flex-1 flex-col min-w-0">
                        <span className="text-xs font-medium text-foreground truncate">{row.label}</span>
                        <span className="text-[10px] text-muted-foreground">{row.stage}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ background: row.dot }} />
                        <span className="text-xs font-semibold text-foreground">{row.value}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Stat card row for the top of the preview
function StatCards() {
    return (
        <div className="grid grid-cols-3 gap-2 p-3 border-b border-border/60">
            {[
                { label: 'Open deals', value: '38', color: '#3b82f6' },
                { label: 'Won this month', value: '$142k', color: '#22c55e' },
                { label: 'Activities due', value: '12', color: '#f59e0b' },
            ].map(s => (
                <div key={s.label} className="rounded-lg bg-muted/60 p-2 text-center">
                    <p className="text-sm font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
            ))}
        </div>
    );
}

// Use-case floating card for step 4
function UseCaseCard({ label }: { label: string }) {
    const ICONS: Record<string, string> = {
        'Sales Pipeline': '📊', 'Lead Management': '🎯', 'Deal Tracking': '🤝',
        'Revenue Intelligence': '📈', 'Email Campaigns': '📧', 'Marketing Automation': '⚡',
        'Customer Success': '🌟', default: '📌',
    };
    const icon = ICONS[label] ?? ICONS.default;

    return (
        <div className="absolute bottom-14 left-3 right-3 z-10 rounded-xl border border-primary/30 bg-background p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{icon}</span>
                <span className="text-xs font-semibold text-foreground">{label}</span>
                <span className="ml-auto text-[10px] text-muted-foreground">Pipeline ▾</span>
            </div>
            {[80, 60, 45].map((w, i) => (
                <div key={i} className="mb-1.5 h-1.5 rounded-full bg-muted" style={{ width: `${w}%` }} />
            ))}
        </div>
    );
}

export function CRMPreview({ step, formData }: CRMPreviewProps) {
    const workspaceName = formData.company_name || 'Freshsales';
    const logo = formData.company_logo || formData.avatar;
    const highlightHeader = step === 1 || step === 2;
    const selectedUseCase = formData.use_cases[0];

    return (
        <div className="flex h-full w-full items-center justify-end overflow-hidden px-4 py-6">
            <div className="relative w-[380px] overflow-hidden rounded-xl border border-border bg-background shadow-xl">

                {/* Header highlight for steps 1 & 2 */}
                {highlightHeader && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 rounded-t-xl border-2 border-primary/40 bg-primary/5" />
                )}

                {/* Workspace nav bar */}
                <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                    <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md text-xs"
                        style={{ background: logo ? 'transparent' : '#6366f1' }}
                    >
                        {logo
                            ? <img src={logo} className="h-full w-full object-cover" alt="" />
                            : <span className="text-white text-[10px]">⚡</span>
                        }
                    </div>
                    <span className="text-xs font-semibold text-foreground">{workspaceName}</span>
                    <span className="text-[10px] text-muted-foreground">▾</span>

                    {/* Right side nav items */}
                    <div className="ml-auto flex items-center gap-2">
                        <div className="h-1.5 w-12 rounded-full bg-muted" />
                        <div className="h-5 w-5 rounded-full bg-muted" />
                    </div>
                </div>

                {/* Sub-nav tabs */}
                <div className="flex gap-4 border-b border-border/60 px-4 py-2">
                    {['All Deals', 'My Pipeline', 'Won', 'Lost'].map((tab, i) => (
                        <span key={tab} className={`text-[10px] font-medium pb-1 ${i === 0 ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}>
                            {tab}
                        </span>
                    ))}
                </div>

                {/* Stats */}
                <StatCards />

                {/* Use-case card overlay for step 4 */}
                {step === 4 && selectedUseCase && (
                    <UseCaseCard label={selectedUseCase} />
                )}

                {/* Pipeline rows */}
                <PipelineRows />

                {/* Footer skeleton */}
                <div className="flex items-center justify-between border-t border-border/40 px-4 py-2.5">
                    <div className="h-1.5 w-20 rounded-full bg-muted" />
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-5 w-5 rounded bg-muted" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CollabPreview() {
    const members = [
        { initials: 'JO', color: '#6366f1' },
        { initials: 'SM', color: '#22c55e' },
        { initials: 'PN', color: '#f59e0b' },
    ];

    const rows = [
        { name: 'Sarah Mitchell', role: 'AE', deals: 12, revenue: '$87k', status: 'On track' },
        { name: 'James Okafor', role: 'SDR', deals: 8, revenue: '$34k', status: 'At risk' },
        { name: 'Priya Nair', role: 'AE', deals: 17, revenue: '$142k', status: 'Exceeding' },
        { name: 'Carlos Vega', role: 'SDR', deals: 5, revenue: '$21k', status: 'On track' },
        { name: 'Emma Torres', role: 'AE', deals: 10, revenue: '$63k', status: 'At risk' },
    ];

    const statusColor: Record<string, string> = {
        'On track': '#22c55e',
        'At risk': '#f59e0b',
        'Exceeding': '#3b82f6',
    };

    return (
        <div className="flex h-full w-full items-center justify-end overflow-hidden px-4 py-6">
            <div className="w-[380px] overflow-hidden rounded-xl border border-border bg-background shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                    <span className="text-xs font-semibold text-foreground">Team Performance</span>
                    <div className="flex items-center gap-1">
                        {members.map(m => (
                            <div
                                key={m.initials}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white"
                                style={{ background: m.color }}
                            >
                                {m.initials}
                            </div>
                        ))}
                        <span className="ml-1 text-[10px] text-muted-foreground">+2 more</span>
                    </div>
                </div>

                {/* Column headers */}
                <div className="grid grid-cols-4 gap-2 border-b border-border/60 px-4 py-2">
                    {['Rep', 'Deals', 'Revenue', 'Status'].map(h => (
                        <span key={h} className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">{h}</span>
                    ))}
                </div>

                {/* Rows */}
                {rows.map((row, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 border-b border-border/30 px-4 py-2.5 last:border-0">
                        <div className="flex items-center gap-1.5 col-span-1">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
                                {row.name.split(' ').map(w => w[0]).join('')}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-[10px] font-medium text-foreground">{row.name.split(' ')[0]}</p>
                                <p className="text-[9px] text-muted-foreground">{row.role}</p>
                            </div>
                        </div>
                        <span className="self-center text-xs font-semibold text-foreground">{row.deals}</span>
                        <span className="self-center text-xs font-semibold text-foreground">{row.revenue}</span>
                        <span className="self-center text-[10px] font-medium" style={{ color: statusColor[row.status] }}>
                            {row.status}
                        </span>
                    </div>
                ))}

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border/40 bg-muted/30 px-4 py-2">
                    <span className="text-[10px] text-muted-foreground">Q1 · 5 reps · $347k pipeline</span>
                    <div className="h-1.5 w-16 rounded-full bg-muted" />
                </div>
            </div>
        </div>
    );
}