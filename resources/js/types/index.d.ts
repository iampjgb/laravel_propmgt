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

// Detailed relations interfaces
export interface UnitOwner {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

export interface Tenant {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

export interface ServiceProvider {
    id: number;
    name: string;
    service_type?: string;
    contact?: string;
}

export interface ManagementMember {
    id: number;
    name: string;
    role: string;
    contact?: string;
}

export interface Unit {
    id: number;
    name: string;
    type?: string;
    floor?: number;
    occupant?: string;
    status?: string;
}

export interface Asset {
    id: number;
    name: string;
    value: string;
}

export interface MaintenanceRequest {
    id: number;
    title: string;
    status?: string;
    assignedTo?: string;
    dueDate?: string;
}

export interface PropertyFile {
    id: number;
    name: string;
    url?: string;
}

export interface Report {
    id: number;
    name: string;
    // add other report fields here
}

// Define contact shape
export interface ContactData {
  id: number;
  property_id: number;
  name: string;
  email?: string;
  phone?: string;
  category: string;
  service_type?: string;
}

// Define property shape with all relations
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
    // Metrics
    totalUnits?: number;
    occupiedUnits?: number;
    monthlyRevenue?: number;
    // Contact relationships
    unitOwners?: ContactData[];
    tenants?: ContactData[];
    // Relations
    serviceProviders?: ServiceProvider[];
    managementTeam?: ManagementMember[];
    units?: Unit[];
    assets?: Asset[];
    maintenanceRequests?: MaintenanceRequest[];
    files?: PropertyFile[];
    reports?: Report[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    // Typed properties
    properties: PropertyData[];
    selected?: PropertyData; // optional for selected context
    // Legacy prop
    property?: PropertyData;
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
    [key: string]: unknown;
}
