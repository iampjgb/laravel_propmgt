import React, { useState, useEffect } from 'react';

interface Property {
    id: number;
    name: string;
    address: string;
    available: boolean;
}

const PropertyManagement: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        // Replace this with your data fetching logic.
        const fetchProperties = async () => {
            try {
                const response = await fetch('/api/properties');
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    const toggleAvailability = (id: number) => {
        setProperties(prevProperties =>
            prevProperties.map(property =>
                property.id === id ? { ...property, available: !property.available } : property
            )
        );
    };

    return (
        <div>
            <h1>Property Management</h1>
            <ul>
                {properties.map(property => (
                    <li key={property.id}>
                        <h2>{property.name}</h2>
                        <p>{property.address}</p>
                        <p>Status: {property.available ? 'Available' : 'Not Available'}</p>
                        <button onClick={() => toggleAvailability(property.id)}>
                            Toggle Availability
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyManagement;