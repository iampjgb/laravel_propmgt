import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

// Define property shape
export interface PropertyData {
    id: number;
    name: string;
    code: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    telephone?: string;
    website?: string;
    sec_no?: string;
    hlurb_no?: string;
    rdo?: string;
    tin_no?: string;
    totalUnits?: number;
    occupiedUnits?: number;
    monthlyRevenue?: number;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    // Typed properties
    properties: PropertyData[];
    property: PropertyData;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
