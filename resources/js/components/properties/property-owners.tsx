import React from 'react';

interface PropertyOwner {
    id: number;
    name: string;
    email: string;
}

interface PropertyOwnersProps {
    owners: PropertyOwner[];
}

const PropertyOwners: React.FC<PropertyOwnersProps> = ({ owners }) => {
    return (
        <div>
            <h1>Property Owners</h1>
            <ul>
                {owners.map((owner) => (
                    <li key={owner.id}>
                        <strong>{owner.name}</strong> - {owner.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyOwners;