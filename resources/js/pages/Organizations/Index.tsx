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
import { Plus, MoreHorizontal, Building2 } from 'lucide-react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Props {
    organizations: {
        data: any[];
        links: any[];
    };
}

export default function Index({ organizations }: Props) {
    const breadcrumbs = [
        { title: 'Organizations', href: '/organizations' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organizations" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center">
                        <Building2 className="w-6 h-6 mr-2" />
                        Organizations
                    </h1>
                    <Button asChild>
                        <Link href="/organizations/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Organization
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {organizations.data.map((org) => (
                                <TableRow key={org.id} className="cursor-pointer hover:bg-muted/50">
                                    <TableCell className="font-medium">
                                        <Link href={`/organizations/${org.id}`} className="hover:underline text-blue-600">
                                            {org.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{org.user?.name || 'N/A'}</TableCell>
                                    <TableCell className="max-w-[300px] truncate">{org.address || 'N/A'}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/organizations/${org.id}`}>View Details</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/organizations/${org.id}/edit`}>Edit</Link>
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
