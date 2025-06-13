import React, { useState } from 'react'
import { Head, usePage } from '@inertiajs/react'
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout'
import type { BreadcrumbItem, SharedData } from '@/types'

interface Property {
  id: number;
  name: string;
  code: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  telephone?: string;
  website: string;
  sec_no: string;
  hlurb_no: string;
  rdo: string;
  tin_no: string;
}
export default function Show() {
  const { property } = usePage<SharedData>().props as unknown as { property: Property }
  const [currentTab, setCurrentTab] = useState('overview');
  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'reports', label: 'Reports' },
    { key: 'units', label: 'Units' },
    { key: 'owners', label: 'Unit Owners & Tenants' },
    { key: 'management', label: 'Management Team' },
    { key: 'providers', label: 'Service Providers' },
    { key: 'assets', label: 'Assets' },
    { key: 'maintenance', label: 'Maintenance Requests' },
    { key: 'files', label: 'Files' },
  ];
  const breadcrumbs: BreadcrumbItem[] = [
    { title: (property as { name: string; id: number }).name, href: `/properties/${(property as { name: string; id: number }).id}` },
  ]

  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <Head title={(property as { name: string }).name} />
      {/* Tab Navigation */}
      <div className="border-b">
        <ul className="flex space-x-4">
          {tabs.map(tab => (
            <li key={tab.key}>
              <button
                onClick={() => setCurrentTab(tab.key)}
                className={
                  `px-4 py-2 -mb-px font-medium border-b-2 ${
                    currentTab === tab.key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`
                }
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Tab Panels */}
      <div className="p-4">
        {currentTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profiling: {property.name}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div><strong>Code:</strong> {property.code}</div>
              <div><strong>Address 1:</strong> {property.address1}</div>
              <div><strong>Address 2:</strong> {property.address2 || '-'}</div>
              <div><strong>City:</strong> {property.city}</div>
              <div><strong>Province:</strong> {property.province}</div>
              <div><strong>Country:</strong> {property.country}</div>
              <div><strong>Telephone:</strong> {property.telephone || '-'}</div>
              <div><strong>Website:</strong> {property.website}</div>
              <div><strong>SEC No.:</strong> {property.sec_no}</div>
              <div><strong>HLURB No.:</strong> {property.hlurb_no}</div>
              <div><strong>RDO:</strong> {property.rdo}</div>
              <div><strong>TIN No.:</strong> {property.tin_no}</div>
            </div>
          </div>
        )}
        {currentTab === 'reports' && <div>Reports content goes here.</div>}
        {currentTab === 'units' && <div>Units content goes here.</div>}
        {currentTab === 'owners' && <div>Unit Owners & Tenants content goes here.</div>}
        {currentTab === 'management' && <div>Management Team content goes here.</div>}
        {currentTab === 'providers' && <div>Service Providers content goes here.</div>}
        {currentTab === 'assets' && <div>Assets content goes here.</div>}
        {currentTab === 'maintenance' && <div>Maintenance Requests content goes here.</div>}
        {currentTab === 'files' && <div>Files content goes here.</div>}
      </div>
    </AppSidebarLayout>
  )
}