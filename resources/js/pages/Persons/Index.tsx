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
import { Plus, MoreHorizontal } from 'lucide-react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Props {
    persons: {
        data: any[];
        links: any[];
    };
}

export default function Index({ persons }: Props) {
    const breadcrumbs = [
        { title: 'Persons', href: '/persons' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Persons" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Contact Persons</h1>
                    <Button asChild>
                        <Link href="/persons/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Person
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Organization</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {persons.data.map((person) => (
                                <TableRow key={person.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/persons/${person.id}`} className="hover:underline text-blue-600">
                                            {person.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{person.organization?.name || 'N/A'}</TableCell>
                                    <TableCell>{person.emails?.[0]?.value || 'N/A'}</TableCell>
                                    <TableCell>{person.contact_numbers?.[0]?.value || 'N/A'}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/persons/${person.id}`}>View Details</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/persons/${person.id}/edit`}>Edit</Link>
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
