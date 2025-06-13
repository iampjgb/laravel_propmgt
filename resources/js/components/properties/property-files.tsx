import React from 'react'

// Define a PropertyFile type and Property interface inline
export interface PropertyFile {
  id: number
  name: string
  url?: string
}

export interface Property {
  files?: PropertyFile[]
}

interface PropertyFilesProps {
  property: Property | null
  onFileSelect?: (file: PropertyFile) => void
}

export function PropertyFiles({ property, onFileSelect }: PropertyFilesProps) {
  const files: PropertyFile[] = property?.files ?? []

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Property Files</h2>

      {files.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {files.map(file => (
            <li
              key={file.id}
              className="cursor-pointer hover:text-blue-600"
              onClick={() => onFileSelect && onFileSelect(file)}
            >
              {file.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No files available.</p>
      )}
    </div>
  )
}
