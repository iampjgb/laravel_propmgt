import React from 'react'

// Define Property interface inline based on database columns
export interface Property {
  id: number
  code: string
  name: string
  address1: string
  address2?: string
  city: string
  province: string
  country: string
  telephone?: string
  website?: string
  sec_no?: string
  hlurb_no?: string
  rdo?: string
  tin_no?: string
}

interface PropertyOverviewProps {
  property: Property | null
}

export function PropertyOverview({ property }: PropertyOverviewProps) {
  if (!property) {
    return <div className="p-4 text-gray-500">Please select a property.</div>
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-2">
      <h2 className="text-2xl font-semibold">{property.name}</h2>
      <p className="text-gray-700">
        {property.address1}
        {property.address2 && `, ${property.address2}`}
      </p>
      <p className="text-gray-700">
        {property.city}, {property.province}, {property.country}
      </p>
      {property.telephone && (
        <p className="text-gray-700">Tel: {property.telephone}</p>
      )}
      {property.website && (
        <p className="text-gray-700">
          Website:{' '}
          <a
            href={property.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {property.website}
          </a>
        </p>
      )}
      <p className="text-gray-700">
        SEC No: {property.sec_no || 'N/A'} | HLURB No: {property.hlurb_no || 'N/A'}
      </p>
      <p className="text-gray-700">
        RDO: {property.rdo || 'N/A'} | TIN: {property.tin_no || 'N/A'}
      </p>
    </div>
  )
}
