import React from 'react'

// Define the ManagementMember type and Property interface inline
export interface ManagementMember {
  id: number
  name: string
  role: string
  contact?: string
}

export interface Property {
  managementTeam?: ManagementMember[]
}

interface PropertyManagementProps {
  property: Property | null
  onMemberClick?: (member: ManagementMember) => void
}

export function PropertyManagement({
  property,
  onMemberClick,
}: PropertyManagementProps) {
  const team: ManagementMember[] = property?.managementTeam ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Management Team</h2>

      {team.length > 0 ? (
        <ul className="space-y-3">
          {team.map(member => (
            <li
              key={member.id}
              className="p-3 bg-white rounded shadow hover:bg-gray-50 cursor-pointer flex justify-between items-center"
              onClick={() => onMemberClick && onMemberClick(member)}
            >
              <div>
                <p className="font-medium text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
              {member.contact && (
                <span className="text-sm text-blue-600">{member.contact}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No management team members defined.</p>
      )}
    </div>
  )
}
