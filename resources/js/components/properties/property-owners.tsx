import React from 'react'

// Define PropertyOwner and Property interfaces inline
export interface PropertyOwner {
  id: number
  name: string
  email?: string
  phone?: string
}

export interface Property {
  unitOwners?: PropertyOwner[]
}

interface PropertyOwnersProps {
  property: Property | null
  onOwnerClick?: (owner: PropertyOwner) => void
}

export function PropertyOwners({ property, onOwnerClick }: PropertyOwnersProps) {
  const owners: PropertyOwner[] = property?.unitOwners ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Property Owners</h2>
      {owners.length > 0 ? (
        <ul className="space-y-2">
          {owners.map(owner => (
            <li
              key={owner.id}
              className="p-3 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
              onClick={() => onOwnerClick && onOwnerClick(owner)}
            >
              <p className="font-medium text-gray-800">{owner.name}</p>
              {owner.email && (
                <p className="text-sm text-gray-500">Email: {owner.email}</p>
              )}
              {owner.phone && (
                <p className="text-sm text-gray-500">Phone: {owner.phone}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No property owners available.</p>
      )}
    </div>
  )
}
