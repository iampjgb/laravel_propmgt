import { useState } from "react"
import { Head, usePage } from "@inertiajs/react"
import type { SharedData, PropertyData } from '@/types'
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout'
import { Tab } from '@headlessui/react'
import { cn } from '@/lib/utils'
import {PropertySelector}   from '@/components/properties/property-selector'
import PropertyOverview  from '@/components/properties/property-overview'
import  PropertyReports  from '@/components/properties/property-reports'
import  PropertyUnits  from '@/components/properties/property-units'
import PropertyOwners from '@/components/properties/property-owners'
import PropertyManagement from '@/components/properties/property-management'
import PropertyServiceProviders  from '@/components/properties/property-service-providers'
import PropertyAssets  from '@/components/properties/property-assets'
import PropertyMaintenance  from '@/components/properties/property-maintenance'
import PropertyFiles  from '@/components/properties/property-files'

export default function PropertiesPage() {
  // Tell TS that page props include SharedData plus the properties array
  const { properties } = usePage<{ properties: PropertyData[] } & SharedData>().props
  // Initialize selectedProperty with explicit PropertyData type
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(
    properties.length > 0 ? properties[0] : null
  )

  const tabs = [
    { label: 'Overview', value: 'overview', Component: PropertyOverview },
    { label: 'Reports', value: 'reports', Component: PropertyReports },
    { label: 'Units', value: 'units', Component: PropertyUnits },
    { label: 'Owners & Tenants', value: 'owners', Component: PropertyOwners },
    { label: 'Management', value: 'management', Component: PropertyManagement },
    { label: 'Providers', value: 'providers', Component: PropertyServiceProviders },
    { label: 'Assets', value: 'assets', Component: PropertyAssets },
    { label: 'Maintenance Requests', value: 'maintenance', Component: PropertyMaintenance },
    { label: 'Files', value: 'files', Component: PropertyFiles },
  ] as const

  const breadcrumbs = [{ title: 'Properties', href: '/properties' }]

  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <Head title="Properties" />

      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Properties</h1>
          <PropertySelector
            value={selectedProperty}
            onChange={setSelectedProperty}
          />
        </div>

        <Tab.Group>
          <Tab.List className="grid w-full grid-cols-9 border-b">
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                className={({ selected }) =>
                  cn(
                    'px-4 py-2 text-sm font-medium -mb-px',
                    selected
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  )
                }
              >
                {tab.label}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="pt-4">
            {tabs.map((tab) => {
              const Component = tab.Component
              return (
                <Tab.Panel key={tab.value}>
                  <Component property={selectedProperty} />
                </Tab.Panel>
              )
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AppSidebarLayout>
  )
}
