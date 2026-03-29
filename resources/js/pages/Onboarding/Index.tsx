import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, User, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function Onboarding({ plans }: { plans: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        organization_name: '',
        slug: '',
        admin_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        plan: 'free',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/onboarding');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Onboarding - Setup your CRM" />

            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight">
                        Launch your Krayin CRM Monolith
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 italic">
                        The world's most powerful open-source CRM, now in a high-performance SaaS monolith.
                    </p>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Card className="shadow-2xl border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-500" />
                                    Organization Setup
                                </CardTitle>
                                <CardDescription>Tell us about your company and create your unique CRM path.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="organization_name">Organization Name</Label>
                                    <Input id="organization_name" value={data.organization_name} onChange={e => setData('organization_name', e.target.value)} placeholder="Acme Corp" />
                                    {errors.organization_name && <p className="text-xs text-red-500">{errors.organization_name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Custom CRM Path</Label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-400">crm.test/</span>
                                        <Input id="slug" value={data.slug} onChange={e => setData('slug', e.target.value)} placeholder="acme" />
                                    </div>
                                    {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-2xl border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-500" />
                                    Administrator Details
                                </CardTitle>
                                <CardDescription>Setup your owner account to start managing leads.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="admin_name">Full Name</Label>
                                    <Input id="admin_name" value={data.admin_name} onChange={e => setData('admin_name', e.target.value)} placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email</Label>
                                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="john@acme.com" />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">Confirm</Label>
                                        <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="shadow-2xl border-none bg-blue-600 text-white sticky top-8">
                            <CardHeader>
                                <CardTitle>Selected Plan</CardTitle>
                                <CardDescription className="text-blue-100">Unlock the full power of CRM.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {plans.map(plan => (
                                        <div
                                            key={plan.id}
                                            onClick={() => setData('plan', plan.id)}
                                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${data.plan === plan.id ? 'bg-white text-blue-600 shadow-lg border-white' : 'border-blue-500 hover:border-white hover:bg-blue-700 text-blue-50'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold underline text-lg">{plan.name}</span>
                                                <span className="text-xl font-black">${plan.price}</span>
                                            </div>
                                            {data.plan === plan.id && (
                                                <div className="mt-2 text-xs flex items-center gap-1 font-semibold">
                                                    <CheckCircle2 className="w-3 h-3" /> Includes 14-day trial
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={processing} className="w-full bg-white text-blue-600 hover:bg-slate-100 font-bold py-6 text-lg rounded-xl shadow-xl">
                                    {processing ? 'Provisioning...' : 'Quick Start CRM'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </div>
        </div>
    );
}
