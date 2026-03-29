import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Settings, Zap, Target, Tag as TagIcon } from 'lucide-react';

interface Props {
    attributes: any[];
    workflows: any[];
    tags: any[];
    pipelines: any[];
}

export default function Index({ attributes, workflows, tags, pipelines }: Props) {
    const breadcrumbs = [
        { title: 'Settings', href: '/settings' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CRM Settings" />

            <div className="p-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                    <p className="text-muted-foreground">Configure your CRM attributes, workflows, and pipelines.</p>
                </header>

                <Tabs defaultValue="attributes" className="space-y-4">
                    <TabsList className="bg-slate-100 p-1">
                        <TabsTrigger value="attributes" className="gap-2">
                            <Settings className="w-4 h-4" />
                            Attributes
                        </TabsTrigger>
                        <TabsTrigger value="workflows" className="gap-2">
                            <Zap className="w-4 h-4" />
                            Workflows
                        </TabsTrigger>
                        <TabsTrigger value="pipelines" className="gap-2">
                            <Target className="w-4 h-4" />
                            Pipelines
                        </TabsTrigger>
                        <TabsTrigger value="tags" className="gap-2">
                            <TagIcon className="w-4 h-4" />
                            Tags
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="attributes">
                        <Card shadow-lg>
                            <CardHeader>
                                <CardTitle>Custom Attributes</CardTitle>
                                <CardDescription>Manage dynamic fields for Leads, Persons, and Organizations.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Entity</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attributes.map((attr) => (
                                            <TableRow key={attr.id}>
                                                <TableCell className="font-mono text-xs">{attr.code}</TableCell>
                                                <TableCell className="font-medium">{attr.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{attr.type}</Badge>
                                                </TableCell>
                                                <TableCell className="capitalize">{attr.entity_type}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="workflows">
                        <Card shadow-lg>
                            <CardHeader>
                                <CardTitle>Automations</CardTitle>
                                <CardDescription>Configure automatic actions based on system events.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Event</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {workflows.map((wf) => (
                                            <TableRow key={wf.id}>
                                                <TableCell className="font-medium">{wf.name}</TableCell>
                                                <TableCell>{wf.event}</TableCell>
                                                <TableCell>
                                                    <Badge variant={wf.status ? "default" : "secondary"}>
                                                        {wf.status ? "Active" : "Disabled"}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
