import React from 'react'

// Define ServiceProvider type and Property interface inline
export interface ServiceProvider {
  id: number
  name: string
  serviceType?: string
  contact?: string
}

export interface Property {
  serviceProviders?: ServiceProvider[]
}

interface PropertyServiceProvidersProps {
  property: Property | null
  onProviderClick?: (provider: ServiceProvider) => void
}

export function PropertyServiceProviders({ property, onProviderClick }: PropertyServiceProvidersProps) {
  const providers: ServiceProvider[] = property?.serviceProviders ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Service Providers</h2>
      {providers.length > 0 ? (
        <ul className="space-y-3">
          {providers.map(provider => (
            <li
              key={provider.id}
              className="p-3 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
              onClick={() => onProviderClick && onProviderClick(provider)}
            >
              <p className="font-medium text-gray-800">{provider.name}</p>
              {provider.serviceType && (
                <p className="text-sm text-gray-500">Type: {provider.serviceType}</p>
              )}
              {provider.contact && (
                <p className="text-sm text-gray-500">Contact: {provider.contact}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No service providers available.</p>
      )}
    </div>
  )
}
