import { useState } from "react"
import { Head, usePage } from "@inertiajs/react"
import type { SharedData } from '@/types'
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../../components/ui/tabs"
import { PropertySelector } from "../../components/properties/property-selector"
import { PropertyOverview } from "../../components/properties/property-overview"
import { PropertyReports } from "../../components/properties/property-reports"
import { PropertyUnits } from "../../components/properties/property-units"
import { PropertyOwners } from "../../components/properties/property-owners"
import { PropertyManagement } from "../../components/properties/property-management"
import { PropertyServiceProviders } from "../../components/properties/property-service-providers"
import { PropertyAssets } from "../../components/properties/property-assets"
import { PropertyMaintenance } from "../../components/properties/property-maintenance"
import { PropertyFiles } from "../../components/properties/property-files"

interface Property {
  id: number
  name: string
  // etc...
}

export default function PropertiesPage() {
  const { properties } = usePage<SharedData>().props
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    (properties as Property[])[0] || null
  )

  const breadcrumbs = [{ title: 'Properties', href: '/properties' }]

  // --- Define your tab config in one place ---
  const tabs = [
    { label: 'Overview',   value: 'overview',   Component: PropertyOverview },
    { label: 'Reports',    value: 'reports',    Component: PropertyReports },
    { label: 'Units',      value: 'units',      Component: PropertyUnits },
    { label: 'Owners & Tenants',  value: 'owners',     Component: PropertyOwners },
    { label: 'Management', value: 'management', Component: PropertyManagement },
    { label: 'Providers',  value: 'providers',   Component: PropertyServiceProviders },
    { label: 'Assets',     value: 'assets',      Component: PropertyAssets },
    { label: 'Maintenance',value: 'maintenance', Component: PropertyMaintenance },
    { label: 'Files',      value: 'files',       Component: PropertyFiles },
  ] as const

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

        <Tabs defaultValue={tabs[0].value} className="w-full">
          <TabsList className="grid w-full grid-cols-9">
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map(tab => {
            const TabComponent = tab.Component
            return (
              <TabsContent key={tab.value} value={tab.value}>
                <TabComponent property={selectedProperty} />
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </AppSidebarLayout>
  )
}
