import React from 'react';

interface PropertyUnit {
    id: string;
    name: string;
    area: number;
    // Additional properties can be added here as needed
}

interface PropertyUnitsProps {
    units: PropertyUnit[];
}

const PropertyUnits: React.FC<PropertyUnitsProps> = ({ units }) => {
    return (
        <div>
            <h2>Property Units</h2>
            {units.length > 0 ? (
                <ul>
                    {units.map(unit => (
                        <li key={unit.id}>
                            {unit.name} - {unit.area} sqft
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No units available.</p>
            )}
        </div>
    );
};

export default PropertyUnits;