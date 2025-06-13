import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import {
  Plus,
  UserCog,
  Settings,
  Calendar as CalendarIcon,
  Home,
  Users,
  Wrench,
  FileText,
  ChevronDown,
  Banknote,
  DollarSign,
  Building,
  Percent,
  Landmark,
  ReceiptText,
  Puzzle,
  Cog
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { NavUser } from '@/components/nav-user';
import { NavFooter } from '@/components/nav-footer';

interface SidebarConfigItem {
  title: string;
  icon?: LucideIcon;
  href?: string;
  action?: () => void;
  tooltip?: string;
  isOpen?: boolean;
  toggle?: () => void;
  sub?: SidebarConfigItem[];
}

export function AppSidebar() {
  const { url } = usePage();
  // Footer links restored
 
  const [adminOpen, setAdminOpen] = useState(url.startsWith('/admin'));
  const [contactsOpen, setContactsOpen] = useState(url.startsWith('/admin/contacts'));
  const [accountingOpen, setAccountingOpen] = useState(url.startsWith('/accounting'));
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Exclusive toggles for main menus
  function toggleAdmin() {
    setAdminOpen(prev => {
      const next = !prev;
      if (next) {
        setAccountingOpen(false);
        setSettingsOpen(false);
      }
      return next;
    });
  }
  function toggleAccounting() {
    setAccountingOpen(prev => {
      const next = !prev;
      if (next) {
        setAdminOpen(false);
        setSettingsOpen(false);
      }
      return next;
    });
  }
  function toggleSettings() {
    setSettingsOpen(prev => {
      const next = !prev;
      if (next) {
        setAdminOpen(false);
        setAccountingOpen(false);
      }
      return next;
    });
  }
  
  function toggleContacts() {
    setContactsOpen(prev => !prev);
  }
  // Exclusive toggles for Admin submenus

  const sidebarConfig: SidebarConfigItem[] = [
    { title: 'Create new', icon: Plus, action: () => {}, tooltip: 'Create new' },
    {
      title: 'Admin',
      icon: UserCog,
      isOpen: adminOpen,
      toggle: toggleAdmin,
      tooltip: 'Admin',
      sub: [
        { title: 'Dashboard', href: '/admin/dashboard', icon: Home },
        { title: 'Calendar', href: '/admin/calendar', icon: CalendarIcon },
        { title: 'Properties', href: '/properties', icon: Building },
        {
          title: 'Contacts',
          icon: Users,
          isOpen: contactsOpen,
          toggle: toggleContacts,
          sub: [
            { title: 'Unit Owners', href: '/admin/contacts/owners' },
            { title: 'Tenants', href: '/admin/contacts/tenants' },
            { title: 'Management', href: '/admin/contacts/management' },
            { title: 'Service Provider', href: '/admin/contacts/service-provider' }
          ]
        },
        { title: 'Maintenance', href: '/admin/maintenance' },
        { title: 'Communication', href: '/admin/communication' },
        { title: 'Documents', href: '/admin/documents' }
      ]
    },
    {
      title: 'Accounting',
      icon: DollarSign,
      isOpen: accountingOpen,
      toggle: toggleAccounting,
      tooltip: 'Accounting',
      sub: [
        { title: 'Banking', href: '/accounting/banking', icon: Landmark },
        { title: 'Income', href: '/accounting/income', icon: Banknote },
        { title: 'Expense', href: '/accounting/expense', icon: ReceiptText },
        { title: 'Accountant Tools', href: '/accounting/tools', icon: Wrench },
        { title: 'Tax', href: '/accounting/tax', icon: Percent },
        { title: 'Reports', href: '/accounting/reports', icon: FileText }
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      isOpen: settingsOpen,
      toggle: toggleSettings,
      tooltip: 'Settings',
      sub: [
        { title: 'User Management', href: '/settings/users', icon: UserCog },
        { title: 'Integrations', href: '/settings/integrations', icon: Puzzle },
        { title: 'Other Settings', href: '/settings/other', icon: Cog }
      ]
    }
  ];

  return (
    <Sidebar collapsible="icon" variant="inset" className="bg-[#014B90]">
      <SidebarHeader className="bg-[#014B90] text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" prefetch>
                <span className="text-xl font-bold text-white">PropMgt</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-[#014B90] text-white">
        <SidebarMenu>
          {sidebarConfig.map(item => (
            <SidebarMenuItem key={item.title}>
              {item.sub ? (
                <SidebarMenuButton
                  className="bg-[#014B90] text-white hover:bg-[#2563EB] data-[active=true]:bg-[#2563EB] data-[active=true]:text-white hover:text-white transition-colors duration-200"
                  onClick={item.toggle}
                  tooltip={item.tooltip ? { children: item.tooltip } : undefined}
                  isActive={item.href ? url.startsWith(item.href) : item.isOpen}
                >
                  {item.icon && <item.icon className="text-white" stroke="white" />}
                  <span>{item.title}</span>
                  <ChevronDown stroke="white" className={cn('ml-auto transition-transform text-white', item.isOpen && 'rotate-180')} />
                </SidebarMenuButton>
              ) : item.href ? (
                <SidebarMenuButton asChild className="bg-[#014B90] text-white hover:bg-[#2563EB] data-[active=true]:bg-[#2563EB] data-[active=true]:text-white hover:text-white transition-colors duration-200" tooltip={item.tooltip ? { children: item.tooltip } : undefined}>
                  <Link href={item.href} prefetch className={cn('flex items-center gap-2 text-white', item.href && url.startsWith(item.href) ? 'font-semibold' : '')}>
                    {item.icon && <item.icon className="text-white" stroke="white" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  onClick={item.action}
                  tooltip={item.tooltip ? { children: item.tooltip } : undefined}
                  className="text-white text-md font-semibold p-5 mb-2 bg-orange-600 hover:bg-orange-500 hover:text-white transition-colors duration-200"
                >
                  {item.icon && <item.icon className="text-white" stroke="white" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}

              {item.sub && item.isOpen && (
                <SidebarMenuSub className={cn(
                  'border-l-0 overflow-hidden transition-all duration-200 ease-in-out',
                  item.isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                )}>
                  {item.sub.map(sub => (
                    <SidebarMenuSubItem key={sub.title}>
                      {sub.sub ? (
                        <SidebarMenuSubButton
                          className="bg-[#014B90] text-white hover:bg-[#2563EB] data-[active=true]:bg-[#2563EB] data-[active=true]:text-white hover:text-white transition-colors duration-200"
                          onClick={sub.toggle}
                          isActive={sub.href ? url.startsWith(sub.href) : sub.isOpen}
                        >
                          {sub.icon && <sub.icon className="text-white" stroke="white" />}
                          <span>{sub.title}</span>
                          <ChevronDown stroke="white" className={cn('ml-auto transition-transform text-white', sub.isOpen && 'rotate-180')} />
                        </SidebarMenuSubButton>
                      ) : sub.href ? (
                        <SidebarMenuSubButton asChild className="bg-[#014B90] text-white hover:bg-[#2563EB] data-[active=true]:bg-[#2563EB] data-[active=true]:text-white hover:text-white transition-colors duration-200">
                          <Link href={sub.href} prefetch className={cn('flex items-center gap-2 text-white', sub.href && url.startsWith(sub.href) ? 'font-semibold' : '')}>
                            {sub.icon && <sub.icon className="text-white" stroke="white" />}
                            <span>{sub.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      ) : (
                        <SidebarMenuSubButton
                          className="bg-[#014B90] text-white hover:bg-[#2563EB] transition-colors duration-200"
                          onClick={sub.action || (() => {})}
                        >
                          {sub.icon && <sub.icon className="text-white" stroke="white" />}
                          <span>{sub.title}</span>
                        </SidebarMenuSubButton>
                      )}

                      {sub.sub && sub.isOpen && (
                        <SidebarMenuSub>
                          {sub.sub.map(nested => (
                            <SidebarMenuSubItem key={nested.title}>
                              <SidebarMenuSubButton asChild size="md" className="bg-[#014B90] text-white hover:bg-[#2563EB] data-[active=true]:bg-[#2563EB] data-[active=true]:text-white hover:text-white transition-colors duration-200">
                                <Link href={nested.href!} prefetch className={cn('flex items-center gap-2 text-white', nested.href! && url.startsWith(nested.href!) ? 'font-semibold' : '')}>
                                  {nested.icon && <nested.icon className="text-white" stroke="white" />}
                                  <span>{nested.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-[#014B90] text-white ">
        <NavFooter items={[]} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
