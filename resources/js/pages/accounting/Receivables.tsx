import React from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout'
import type { BreadcrumbItem } from '@/types'

type Section = 'overview' | 'invoices' | 'collections' | 'batch-transactions' | 'meter-reading' | 'customers' | 'charges-items'

const tabs: { key: Section; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'collections', label: 'Collections' },
  { key: 'batch-transactions', label: 'Batch Transactions' },
  { key: 'meter-reading', label: 'Meter Reading' },
  { key: 'customers', label: 'Customers' },
  { key: 'charges-items', label: 'Charges Items' },
]

export default function Receivables() {
  const { section } = usePage<{ section: Section }>().props
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Accounting', href: '/accounting' },
    { title: 'Receivables', href: route('accounting.receivables', { section }) }
  ]

  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <Head title={`Receivables: ${section}`} />
      <div className="border-b">
        <ul className="flex space-x-8 px-4 sm:px-6 lg:px-8">
          {tabs.map(tab => (
            <li key={tab.key}>
              <Link
                href={route('accounting.receivables', { section: tab.key })}
                className={`text-sm font-medium pb-3 ${section === tab.key ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >{tab.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab panels */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
        {section === 'overview' && <div className="text-gray-700 text-base">Overview content</div>}
        {section === 'invoices' && <div className="text-gray-700 text-base">Invoices content</div>}
        {section === 'collections' && <div className="text-gray-700 text-base">Collections content</div>}
        {section === 'batch-transactions' && <div className="text-gray-700 text-base">Batch Transactions content</div>}
        {section === 'meter-reading' && <div className="text-gray-700 text-base">Meter Reading content</div>}
        {section === 'customers' && <div className="text-gray-700 text-base">Customers content</div>}
        {section === 'charges-items' && <div className="text-gray-700 text-base">Charges Items content</div>}
      </div>
    </AppSidebarLayout>
  )
}
