/* eslint-disable max-len */
import React from 'react';
import './ResourcePanel.css';

interface Resource {
  id: string;
  name: string;
  type: 'Equipment' | 'Supply';
  status: 'Available' | 'In Use' | 'Maintenance' | 'Low Stock';
  quantity?: number;
  lastMaintenance?: string;
}

interface ResourcePanelProps {
  resources: Resource[];
  title?: string;
}

const ResourcePanel: React.FC<ResourcePanelProps> = ({ resources, title = 'Resource Management' }) => {
  const getStatusColor = (status: Resource['status']) => {
    switch (status) {
      case 'Available':
        return 'var(--success-green)';
      case 'In Use':
        return 'var(--info-blue)';
      case 'Maintenance':
        return 'var(--warning-amber)';
      case 'Low Stock':
        return 'var(--error-red)';
      default:
        return 'var(--secondary-sage)';
    }
  };

  return (
    <div className="vrd-resource-panel">
      <h2 className="vrd-resource-panel__title">{title}</h2>
      <div className="vrd-resource-panel__grid">
        {resources.map((resource) => (
          <div key={resource.id} className="vrd-resource-panel__card">
            <div className="vrd-resource-panel__card-header">
              <h3 className="vrd-resource-panel__card-name">{resource.name}</h3>
              <span 
                className="vrd-resource-panel__card-status"
                style={{ backgroundColor: getStatusColor(resource.status) }}
              >
                {resource.status}
              </span>
            </div>
            <div className="vrd-resource-panel__card-body">
              <p><strong>Type:</strong> {resource.type}</p>
              {resource.quantity !== undefined && <p><strong>Quantity:</strong> {resource.quantity}</p>}
              {resource.lastMaintenance && <p><strong>Last Maintenance:</strong> {resource.lastMaintenance}</p>}
            </div>
            <div className="vrd-resource-panel__card-actions">
              <button className="vrd-button vrd-button--secondary">Details</button>
              {resource.type === 'Equipment' && <button className="vrd-button vrd-button--secondary">Schedule Maintenance</button>}
              {resource.type === 'Supply' && <button className="vrd-button vrd-button--secondary">Reorder</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcePanel; 