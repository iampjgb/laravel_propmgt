import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell, MessageCircle, ChevronDown, Search as SearchIcon } from 'lucide-react';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth, properties } = page.props;
    const getInitials = useInitials();
    const [messages] = useState<string[]>(['Message 1', 'Message 2']);
    const [notifications] = useState<string[]>(['Notification 1', 'Notification 2']);
    const [propertySearch, setPropertySearch] = useState('');
    const filteredProperties = (properties as { id: number; name: string }[]).filter((prop) =>
        prop.name.toLowerCase().includes(propertySearch.toLowerCase())
    );
    return (
        <>
            <div className="border-b border-sidebar-border/80 bg-gray-100">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                {/* Mobile toggle button removed */}
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    {/* Brand removed */}
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {/* Removed mainNavItems mapping for Dashboard menu */}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Brand text in header */}
                    <div className="text-gray-800 text-xl font-bold">PropMgt</div>

                    <div className="ml-auto flex items-center space-x-2">
                        {/* Properties dropdown (searchable) */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center space-x-1 text-gray-800 hover:text-gray-900">
                                    {/* <Settings className="size-5 text-gray-800" /> */}
                                    <span>Properties</span>
                                    <ChevronDown className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64">
                                <div className="p-2">
                                    <div className="relative">
                                        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <Input
                                            placeholder="Search properties..."
                                            value={propertySearch}
                                            onChange={e => setPropertySearch(e.currentTarget.value)}
                                            className="pl-8 w-full"
                                        />
                                    </div>
                                </div>
                                {filteredProperties.map((prop: { id: number; name: string }) => (
                                    <DropdownMenuItem key={prop.id}>
                                        <Link href={`/properties/${prop.id}`} className="block w-full text-gray-800 hover:text-gray-900">
                                            {prop.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Search bar */}
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input placeholder="Search..." className="pl-10 pr-3 py-1 w-64 bg-white text-gray-900" />
                        </div>
                        {/* Message icon */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-800 hover:text-gray-900">
                                    <MessageCircle />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {messages.map(msg => (
                                    <DropdownMenuItem key={msg}>{msg}</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Notification icon */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-800 hover:text-gray-900">
                                    <Bell />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {notifications.map(ntf => (
                                    <DropdownMenuItem key={ntf}>{ntf}</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Profile dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-800 hover:text-gray-900">
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
