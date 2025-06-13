import React from 'react';

interface PropertyOverviewProps {
  title?: string;
  description?: string;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({
  title = 'Property Overview',
  description = 'This is the property overview component.',
}) => {
  return (
    <div className="property-overview">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default PropertyOverview;