import React from 'react'

// Define MaintenanceRequest type and Property interface inline
export interface MaintenanceRequest {
  id: number
  title: string
  status?: string
  assignedTo?: string
  dueDate?: string
}

export interface Property {
  maintenanceRequests?: MaintenanceRequest[]
}

interface PropertyMaintenanceProps {
  property: Property | null
  onRequestClick?: (request: MaintenanceRequest) => void
}

export function PropertyMaintenance({ property, onRequestClick }: PropertyMaintenanceProps) {
  const requests: MaintenanceRequest[] = property?.maintenanceRequests ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Maintenance Requests</h2>

      {requests.length > 0 ? (
        <ul className="space-y-2">
          {requests.map(request => (
            <li
              key={request.id}
              onClick={() => onRequestClick && onRequestClick(request)}
              className="flex justify-between items-center p-3 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
            >
              <div>
                <p className="font-medium text-gray-800">{request.title}</p>
                {request.status && (
                  <p className="text-sm text-gray-500">Status: {request.status}</p>
                )}
              </div>
              {request.dueDate && (
                <span className="text-sm text-gray-500">Due: {request.dueDate}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No maintenance requests available.</p>
      )}
    </div>
  )
}
