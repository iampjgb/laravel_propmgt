import React from 'react'

// Define Report type and Property interface inline
export interface Report {
  id: number
  name: string
  // add other report fields here
}

export interface Property {
  reports?: Report[]
}

interface PropertyReportsProps {
  property: Property | null
  onReportClick?: (report: Report) => void
}

export function PropertyReports({ property, onReportClick }: PropertyReportsProps) {
  const reports: Report[] = property?.reports ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Property Reports</h2>
      {reports.length > 0 ? (
        <ul className="space-y-2">
          {reports.map(report => (
            <li
              key={report.id}
              className="p-3 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
              onClick={() => onReportClick && onReportClick(report)}
            >
              <p className="text-gray-800">{report.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reports available.</p>
      )}
    </div>
  )
}
