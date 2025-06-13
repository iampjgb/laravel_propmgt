import React from 'react';

interface PropertyFile {
    id: number;
    name: string;
    // Define additional properties as needed
}

interface PropertyFilesProps {
    files: PropertyFile[];
    onFileSelect?: (file: PropertyFile) => void;
}

const PropertyFiles: React.FC<PropertyFilesProps> = ({ files, onFileSelect }) => {
    return (
        <div className="property-files">
            <h2>Property Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file.id} onClick={() => onFileSelect && onFileSelect(file)}>
                        {file.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyFiles;