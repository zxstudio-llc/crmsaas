import { 
    LayoutGrid, 
    Target, 
    Users, 
    Building2, 
    FileText, 
    Mail, 
    Calendar, 
    Package, 
    Settings, 
    Zap,
    Warehouse
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import { usePage, Link } from '@inertiajs/react';

export function AppSidebar() {
    const { tenant } = usePage().props as any;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: `/${tenant}/dashboard`,
            icon: LayoutGrid,
        },
        {
            title: 'Leads',
            href: `/${tenant}/leads`,
            icon: Target,
        },
        {
            title: 'Persons',
            href: `/${tenant}/persons`,
            icon: Users,
        },
        {
            title: 'Organizations',
            href: `/${tenant}/organizations`,
            icon: Building2,
        },
        {
            title: 'Products',
            href: `/${tenant}/products`,
            icon: Package,
        },
        {
            title: 'Quotes',
            href: `/${tenant}/quotes`,
            icon: FileText,
        },
        {
            title: 'Activities',
            href: `/${tenant}/activities`,
            icon: Calendar,
        },
        {
            title: 'Emails',
            href: `/${tenant}/emails`,
            icon: Mail,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Automation',
            href: `/${tenant}/automation`,
            icon: Zap,
        },
        {
            title: 'Warehouses',
            href: `/${tenant}/warehouses`,
            icon: Warehouse,
        },
        {
            title: 'Settings',
            href: `/${tenant}/settings`,
            icon: Settings,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={`/${tenant}/dashboard`} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
