import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Users, 
    TrendingUp, 
    Briefcase, 
    DollarSign,
    ArrowUpRight,
    Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    stats: {
        total_leads: number;
        won_leads: number;
        total_revenue: number;
        total_customers: number;
    };
    recent_leads: any[];
}

export default function Dashboard({ stats, recent_leads }: Props) {
    return (
        <AppLayout>
            <Head title="CRM Dashboard" />
            
            <div className="flex flex-col gap-8 p-8">
                <header className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
                    <p className="text-muted-foreground italic text-sm">Real-time performance metrics for your sales pipeline.</p>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-t-4 border-t-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                            <Briefcase className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_leads}</div>
                            <p className="text-xs text-muted-foreground">+12% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-emerald-500 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">\${stats.total_revenue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-purple-500 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Won CRM Leads</CardTitle>
                            <TrendingUp className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.won_leads}</div>
                            <p className="text-xs text-muted-foreground">+5 today</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-orange-500 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Contact Persons</CardTitle>
                            <Users className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_customers}</div>
                            <p className="text-xs text-muted-foreground">Active in CRM</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="shadow-2xl border-none bg-gradient-to-br from-white to-slate-50">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_leads.map((lead) => (
                                    <div key={lead.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {lead.title[0]}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold">{lead.title}</div>
                                            <div className="text-xs text-muted-foreground">{lead.person?.name || 'Manual Entry'}</div>
                                        </div>
                                        <div className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                                            {lead.stage?.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
