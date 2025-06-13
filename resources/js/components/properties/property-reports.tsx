import React, { useState, useEffect } from 'react';

interface PropertyReport {
    id: number;
    name: string;
    // Add any other properties as needed
}

const PropertyReports: React.FC = () => {
    const [reports, setReports] = useState<PropertyReport[]>([]);

    useEffect(() => {
        // Replace the following with an actual fetch call if required
        setReports([
            { id: 1, name: 'Report 1' },
            { id: 2, name: 'Report 2' }
        ]);
    }, []);

    return (
        <div>
            <h1>Property Reports</h1>
            <ul>
                {reports.map(report => (
                    <li key={report.id}>{report.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyReports;