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
import { Mail, Plus, Star, Paperclip, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Props {
    emails: {
        data: any[];
        links: any[];
    };
}

export default function Index({ emails }: Props) {
    const breadcrumbs = [
        { title: 'Emails', href: '/emails' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Email Inbox" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Mail className="w-6 h-6 text-blue-600" />
                        CRM Mailbox
                    </h1>
                    <Button asChild>
                        <Link href="/emails/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Compose Email
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-200 group-hover:bg-slate-100">
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead className="w-[200px]">Sender</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead className="w-[100px]">Tags</TableHead>
                                <TableHead className="w-[150px]">Date Received</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {emails.data.length > 0 ? (
                                emails.data.map((email) => (
                                    <TableRow key={email.id} className={cn("hover:bg-blue-50/50 cursor-pointer group", !email.is_read && "bg-blue-50/30")}>
                                        <TableCell>
                                            <Star className={cn("w-4 h-4", email.is_starred ? "text-yellow-400 fill-current" : "text-slate-200")} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                    {email.from.name ? email.from.name[0] : (email.from.address ? email.from.address[0] : '?').toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={cn("text-sm", !email.is_read ? "font-bold text-slate-900" : "text-slate-600")}>
                                                        {email.from.name || email.from.address}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-mono">{email.from.address}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={`/emails/${email.id}`} className={cn("text-sm hover:underline", !email.is_read ? "font-semibold text-slate-900" : "text-slate-600")}>
                                                    {email.subject || '(No Subject)'}
                                                </Link>
                                                {email.attachments?.length > 0 && <Paperclip className="w-3 h-3 text-slate-400" />}
                                                <span className="text-xs text-slate-400 line-clamp-1 italic">
                                                    {email.reply?.replace(/<[^>]*>/g, '').substring(0, 50)}...
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {email.tags.map(tag => (
                                                    <Badge key={tag.id} className="text-[9px] px-1 py-0 h-4 border-none" style={{ backgroundColor: tag.color + '22', color: tag.color }}>
                                                        {tag.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs text-slate-400 align-middle">
                                            {new Date(email.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40 shadow-xl">
                                                    <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                                                    <DropdownMenuItem>Archive Email</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500 font-medium">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-slate-400">
                                        No emails found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
