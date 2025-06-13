import React, { useState, useMemo } from 'react'

// Define UnitOwner and Property interfaces inline
export interface UnitOwner {
  id: number
  name: string
  email?: string
  phone?: string
}

export interface Property {
  unitOwners?: UnitOwner[]
  tenants?: UnitOwner[]
}

interface PropertyOwnersProps {
  property: Property | null
  onOwnerClick?: (owner: UnitOwner) => void
}

export function PropertyOwners({ property, onOwnerClick }: PropertyOwnersProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const pageSize = 10

  // Combine owners and tenants with a category flag, and filter
  const data = useMemo(() => {
    const owners = property?.unitOwners ?? []
    const tenants = property?.tenants ?? []
    const tagged = [
      ...owners.map(o => ({ ...o, category: 'Owner' })),
      ...tenants.map(t => ({ ...t, category: 'Tenant' })),
    ]
    return tagged.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase())
    )
  }, [property, search])

  const pageCount = Math.ceil(data.length / pageSize)
  const paginated = data.slice(page * pageSize, (page + 1) * pageSize)

  const [selected, setSelected] = useState<Set<number>>(new Set())

  const toggleSelectAll = () => {
    const newSet = new Set<number>()
    if (selected.size < paginated.length) {
      paginated.forEach(item => newSet.add(item.id))
    }
    setSelected(newSet)
  }

  const toggleSelect = (id: number) => {
    const newSet = new Set(selected)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelected(newSet)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Owners & Tenants</h2>

      {/* Search */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0) }}
          className="flex-1 rounded-l border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={() => setPage(0)}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selected.size === paginated.length && paginated.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(item => (
              <tr key={item.id} className={selected.has(item.id) ? 'bg-blue-50' : ''}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{item.email || '—'}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{item.phone || '—'}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{item.category}</td>
                <td className="px-4 py-2 text-center text-sm">
                  <button
                    onClick={() => onOwnerClick && onOwnerClick(item)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {page + 1} of {pageCount}
        </span>
        <button
          onClick={() => setPage(p => Math.min(p + 1, pageCount - 1))}
          disabled={page + 1 >= pageCount}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
