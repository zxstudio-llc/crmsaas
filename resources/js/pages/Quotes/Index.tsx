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
import { FileText, Plus, Eye, MoreVertical } from 'lucide-react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Props {
    quotes: {
        data: any[];
        links: any[];
    };
}

export default function Index({ quotes }: Props) {
    const breadcrumbs = [
        { title: 'Quotes', href: '/quotes' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quotations" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        Quotations
                    </h1>
                    <Button asChild>
                        <Link href="/quotes/create">
                            <Plus className="w-4 h-4 mr-2" />
                            New Quote
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>Contact Person</TableHead>
                                <TableHead>Grand Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Expired At</TableHead>
                                <TableHead className="w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quotes.data.map((quote) => (
                                <TableRow key={quote.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/quotes/${quote.id}`} className="hover:underline text-blue-600">
                                            {quote.subject}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{quote.person?.name || 'N/A'}</TableCell>
                                    <TableCell className="font-semibold text-slate-900">\${quote.grand_total.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">Active</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-500">
                                        {quote.expired_at ? new Date(quote.expired_at).toLocaleDateString() : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/quotes/${quote.id}`}>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/quotes/${quote.id}/edit`}>Edit</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
