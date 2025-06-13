import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { usePage } from '@inertiajs/react'
import type { SharedData } from '@/types'
import { ChevronDown, Search as SearchIcon } from 'lucide-react'

interface Property {
  id: number
  name: string
}

interface PropertySelectorProps {
  value: Property | null
  onChange: (prop: Property) => void
}

export function PropertySelector({ value, onChange }: PropertySelectorProps) {
  const { properties } = usePage<SharedData>().props as unknown as { properties: Property[] }
  const [query, setQuery] = useState('')

  const filtered =
    query === ''
      ? properties
      : properties.filter(prop =>
          prop.name.toLowerCase().includes(query.toLowerCase())
        )

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative w-64">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Combobox.Input
            className="w-full border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            displayValue={(prop: Property) => prop?.name || ''}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search property..."
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filtered.map(prop => (
            <Combobox.Option
              key={prop.id}
              value={prop}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {prop.name}
                  </span>
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}