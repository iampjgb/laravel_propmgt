import React from 'react'

// Inline definitions for clarity
export interface Unit {
  id: number
  name: string
  type?: string
  floor?: number
  occupant?: string
  status?: string
}

export interface Property {
  units?: Unit[]
}

interface PropertyUnitsProps {
  property: Property | null
  onUnitClick?: (unit: Unit) => void
}

export function PropertyUnits({ property, onUnitClick }: PropertyUnitsProps) {
  const units: Unit[] = property?.units ?? []

  if (units.length === 0) {
    return <div className="p-4 text-gray-500">No units available.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Floor</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Occupant</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, idx) => (
            <tr
              key={unit.id}
              className={`${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-100 cursor-pointer`}
              onClick={() => onUnitClick?.(unit)}
            >
              <td className="px-4 py-2 text-sm text-gray-800">{unit.id}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{unit.name}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{unit.type ?? '—'}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{unit.floor ?? '—'}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{unit.occupant ?? '—'}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{unit.status ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
