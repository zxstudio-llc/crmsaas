import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
    activities: {
        data: any[];
        links: any[];
    };
}

export default function Index({ activities }: Props) {
    const breadcrumbs = [
        { title: 'Activities', href: '/activities' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activities" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Calendar className="w-6 h-6" />
                        CRM Activities
                    </h1>
                    <Button asChild>
                        <Link href="/activities/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Activity
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg border shadow-sm">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[100px]">Type</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Person(s)</TableHead>
                                <TableHead>Leads</TableHead>
                                <TableHead>From / To</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activities.data.map((activity) => (
                                <TableRow key={activity.id} className="group">
                                    <TableCell>
                                        <Badge variant="secondary" className="uppercase text-[10px] font-bold tracking-wider">
                                            {activity.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/activities/${activity.id}`} className="font-medium hover:underline text-blue-600 block">
                                            {activity.title}
                                        </Link>
                                        <span className="text-xs text-slate-400 block truncate max-w-[200px]">{activity.comment}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {activity.is_done ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <Circle className="w-4 h-4 text-slate-300" />
                                            )}
                                            <span className={cn("text-sm", activity.is_done ? "text-emerald-600 font-medium" : "text-slate-500")}>
                                                {activity.is_done ? "Completed" : "Scheduled"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        <div className="flex -space-x-1.5 overflow-hidden">
                                            {activity.persons.slice(0, 3).map((person: any) => (
                                                <div key={person.id} className="h-6 w-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600" title={person.name}>
                                                    {person.name[0]}
                                                </div>
                                            ))}
                                            {activity.persons.length > 3 && (
                                                <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                    +{activity.persons.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-500">
                                        {activity.leads.map((lead: any) => lead.title).join(', ') || 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-[11px] leading-tight text-slate-500">
                                        <div>{new Date(activity.schedule_from).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
                                        <div className="text-slate-300 font-mono">---</div>
                                        <div>{activity.schedule_to ? new Date(activity.schedule_to).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'No End'}</div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
