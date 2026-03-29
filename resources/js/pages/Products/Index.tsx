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
import { Plus, Package, BadgeInfo } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Props {
    products: {
        data: any[];
        links: any[];
    };
}

export default function Index({ products }: Props) {
    const breadcrumbs = [
        { title: 'Products', href: '/products' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Package className="w-6 h-6" />
                        Products Inventory
                    </h1>
                    <Button asChild>
                        <Link href="/products/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Link>
                    </Button>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead>SKU</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data.map((product) => (
                                <TableRow key={product.id} className="hover:bg-slate-50/50">
                                    <TableCell className="font-mono text-xs text-slate-500">{product.sku}</TableCell>
                                    <TableCell className="font-medium text-slate-800">
                                        <Link href={`/products/${product.id}`} className="hover:underline">
                                            {product.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-slate-700">\${product.price.toLocaleString()}</TableCell>
                                    <TableCell className="text-slate-700 font-medium">{product.quantity}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.quantity > 0 ? "outline" : "destructive"}>
                                            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                                        </Badge>
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
