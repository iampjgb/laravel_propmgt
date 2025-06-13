import React from 'react'
interface Property {
  assets?: Asset[]
}

interface Asset {
  id: number
  name: string
  value: string
}

interface PropertyAssetsProps {
  property: Property | null
}

export function PropertyAssets({ property }: PropertyAssetsProps) {
  const assets: Asset[] = property?.assets ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Property Assets</h2>

      {assets.length > 0 ? (
        <ul className="space-y-2">
          {assets.map(asset => (
            <li key={asset.id} className="flex justify-between">
              <span className="font-medium">{asset.name}</span>
              <span>{asset.value}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No assets available.</p>
      )}
    </div>
  )
}
