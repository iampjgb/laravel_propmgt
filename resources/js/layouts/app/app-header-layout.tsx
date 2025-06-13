import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Bell, MessageCircle, ChevronDown, Search as SearchIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const getInitials = useInitials();
    const { properties } = usePage<SharedData>().props as unknown as { properties: { id: number; name: string }[] };
    const [propertySearch, setPropertySearch] = useState('');
    const filteredProperties = properties.filter((prop: { name: string }) =>
        prop.name.toLowerCase().includes(propertySearch.toLowerCase())
    );

    const messages = ['Message 1', 'Message 2']; // Dummy messages
    const notifications = ['Notification 1', 'Notification 2']; // Dummy notifications

    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            {/* Secondary navbar in main area */}
            <div className="flex items-center justify-end space-x-4 bg-gray-100 p-4 shadow-sm">
                {/* Searchable Properties Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-1 text-gray-800 hover:text-gray-900">
                            <span>Properties</span>
                            <ChevronDown className="h-4 w-4 text-gray-800" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                        <div className="p-2">
                            <Input
                                placeholder="Search properties..."
                                value={propertySearch}
                                onChange={e => setPropertySearch(e.currentTarget.value)}
                            />
                        </div>
                        {filteredProperties.map((prop: { id: number; name: string }) => (
                            <DropdownMenuItem key={prop.id}>
                                <Link href={`/properties/${prop.id}`} className="block w-full">{prop.name}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* Search Bar */}
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input placeholder="Search..." className="pl-10 pr-3 py-1 w-64 bg-white text-gray-900" />
                </div>
                {/* Messages Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-800 hover:text-gray-900">
                            <MessageCircle className="text-gray-800" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {messages.map(msg => (
                            <DropdownMenuItem key={msg}>{msg}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* Notifications Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-800 hover:text-gray-900">
                            <Bell className="text-gray-800" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {notifications.map(ntf => (
                            <DropdownMenuItem key={ntf}>{ntf}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* Profile Avatar Dropdown using pravatar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={`https://i.pravatar.cc/150?u=${usePage<SharedData>().props.auth.user.email}`} 
                                />
                                <AvatarFallback>{getInitials(usePage<SharedData>().props.auth.user.name)}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        {/* can reuse UserMenuContent or similar here */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
