import React from 'react';

interface PropertyAsset {
    id: number;
    name: string;
    value: string;
}

interface PropertyAssetsProps {
    assets: PropertyAsset[];
}

const PropertyAssets: React.FC<PropertyAssetsProps> = ({ assets }) => {
    return (
        <div>
            <h2>Property Assets</h2>
            {assets.length > 0 ? (
                <ul>
                    {assets.map(asset => (
                        <li key={asset.id}>
                            <strong>{asset.name}</strong>: {asset.value}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No assets available.</p>
            )}
        </div>
    );
};

export default PropertyAssets;