/* eslint-disable max-len */
/* eslint-disable import/order */
import React from 'react';
import './SensorCard.css';

export type SensorType = 
  | 'temperature' 
  | 'humidity' 
  | 'light' 
  | 'ph' 
  | 'nutrients' 
  | 'air_quality'
  | 'co2'
  | 'soil_moisture'
  | 'conductivity';

export type SensorStatus = 'optimal' | 'warning' | 'critical' | 'offline' | 'calibrating';

export interface SensorThreshold {
  optimal: { min: number; max: number };
  warning: { min: number; max: number };
  critical: { min: number; max: number };
}

export interface SensorData {
  id: string;
  type: SensorType;
  name: string;
  value: number;
  unit: string;
  status: SensorStatus;
  lastUpdate: Date;
  location?: string;
  thresholds: SensorThreshold;
  trend?: 'rising' | 'falling' | 'stable';
  history?: Array<{ timestamp: Date; value: number }>;
}

export interface SensorCardProps {
  sensor: SensorData;
  size?: 'compact' | 'standard' | 'detailed';
  showTrend?: boolean;
  showAlerts?: boolean;
  showActions?: boolean;
  onCalibrate?: (sensorId: string) => void;
  onViewHistory?: (sensorId: string) => void;
  onSetAlert?: (sensorId: string) => void;
  onExportData?: (sensorId: string) => void;
  className?: string;
  testId?: string;
}

const SENSOR_ICONS: Record<SensorType, string> = {
  temperature: '🌡️',
  humidity: '💧',
  light: '☀️',
  ph: '🧪',
  nutrients: '🌱',
  air_quality: '🌬️',
  co2: '🫧',
  soil_moisture: '🪴',
  conductivity: '⚡'
};

const SENSOR_LABELS: Record<SensorType, string> = {
  temperature: 'Temperature',
  humidity: 'Humidity',
  light: 'Light Intensity',
  ph: 'pH Level',
  nutrients: 'Nutrients',
  air_quality: 'Air Quality',
  co2: 'CO₂ Level',
  soil_moisture: 'Soil Moisture',
  conductivity: 'Conductivity'
};

const formatLastUpdate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const getStatusLevel = (value: number, thresholds: SensorThreshold | undefined): SensorStatus => {
  if (!thresholds) return 'optimal'; // Default to optimal if no thresholds are provided

  const { optimal, warning, critical } = thresholds;
  
  if (value >= optimal.min && value <= optimal.max) return 'optimal';
  if (value >= warning.min && value <= warning.max) return 'warning';
  if (value >= critical.min && value <= critical.max) return 'critical';
  return 'critical';
};

const renderTrendIndicator = (trend: 'rising' | 'falling' | 'stable' | undefined) => {
  if (!trend) return null;
  
  const trendIcons = {
    rising: '↗️',
    falling: '↘️',
    stable: '→'
  };
  
  return (
    <span className={`vrd-sensor-card__trend vrd-sensor-card__trend--${trend}`}>
      {trendIcons[trend]}
    </span>
  );
};

const renderProgressBar = (value: number, thresholds: SensorThreshold, status: SensorStatus) => {
  const { optimal, warning } = thresholds;
  const totalRange = Math.max(warning.max, optimal.max) - Math.min(warning.min, optimal.min);
  const normalizedValue = ((value - Math.min(warning.min, optimal.min)) / totalRange) * 100;
  
  return (
    <div className="vrd-sensor-card__progress">
      <div className="vrd-sensor-card__progress-track">
        <div 
          className={`vrd-sensor-card__progress-fill vrd-sensor-card__progress-fill--${status}`}
          style={{ width: `${Math.max(0, Math.min(100, normalizedValue))}%` }}
        />
      </div>
    </div>
  );
};

const renderSparkline = (history: Array<{ timestamp: Date; value: number }> | undefined) => {
  if (!history || history.length < 2) return null;
  
  const maxValue = Math.max(...history.map(h => h.value));
  const minValue = Math.min(...history.map(h => h.value));
  const range = maxValue - minValue;
  
  const points = history.map((point, index) => {
    const x = (index / (history.length - 1)) * 100;
    const y = range > 0 ? ((maxValue - point.value) / range) * 100 : 50;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="vrd-sensor-card__sparkline">
      <svg viewBox="0 0 100 100" className="vrd-sensor-card__sparkline-svg">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
        />
      </svg>
    </div>
  );
};

export const SensorCard: React.FC<SensorCardProps> = ({
  sensor,
  size = 'standard',
  showTrend = true,
  showAlerts = true,
  showActions = true,
  onCalibrate,
  onViewHistory,
  onSetAlert,
  onExportData,
  className = '',
  testId = 'sensor-card'
}) => {
  const {
    id,
    type,
    name,
    value,
    unit,
    status,
    lastUpdate,
    location,
    thresholds,
    trend,
    history
  } = sensor;

  const icon = SENSOR_ICONS[type];
  const label = SENSOR_LABELS[type];
  const computedStatus = status === 'offline' || status === 'calibrating' ? status : getStatusLevel(value, thresholds);

  const baseClass = 'vrd-sensor-card';
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    `${baseClass}--${computedStatus}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} data-testid={testId}>
      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__icon`}>
          {icon}
        </div>
        <div className={`${baseClass}__info`}>
          <h3 className={`${baseClass}__title`}>{name || label}</h3>
          {location && size !== 'compact' && (
            <p className={`${baseClass}__location`}>{location}</p>
          )}
        </div>
        {showTrend && renderTrendIndicator(trend)}
      </div>

      <div className={`${baseClass}__content`}>
        <div className={`${baseClass}__reading`}>
          <span className={`${baseClass}__value`}>
            {status === 'offline' ? '--' : value.toFixed(1)}
          </span>
          <span className={`${baseClass}__unit`}>{unit}</span>
        </div>

        {size !== 'compact' && (
          <div className={`${baseClass}__status`}>
            <span className={`${baseClass}__status-badge ${baseClass}__status-badge--${computedStatus}`}>
              {computedStatus.charAt(0).toUpperCase() + computedStatus.slice(1)}
            </span>
          </div>
        )}

        {size !== 'compact' && status !== 'offline' && (
          <>
            {thresholds && renderProgressBar(value, thresholds, computedStatus)}
            {showTrend && history && renderSparkline(history)}
          </>
        )}
      </div>

      <div className={`${baseClass}__footer`}>
        <div className={`${baseClass}__timestamp`}>
          <span className={`${baseClass}__last-update`}>
            {formatLastUpdate(lastUpdate)}
          </span>
        </div>

        {showActions && size !== 'compact' && (
          <div className={`${baseClass}__actions`}>
            {onCalibrate && (
              <button
                type="button"
                className={`${baseClass}__action`}
                onClick={() => onCalibrate(id)}
                aria-label={`Calibrate ${name || label}`}
              >
                📋
              </button>
            )}
            {onViewHistory && (
              <button
                type="button"
                className={`${baseClass}__action`}
                onClick={() => onViewHistory(id)}
                aria-label={`View ${name || label} history`}
              >
                📊
              </button>
            )}
            {onSetAlert && (
              <button
                type="button"
                className={`${baseClass}__action`}
                onClick={() => onSetAlert(id)}
                aria-label={`Set alert for ${name || label}`}
              >
                🔔
              </button>
            )}
            {onExportData && (
              <button
                type="button"
                className={`${baseClass}__action`}
                onClick={() => onExportData(id)}
                aria-label={`Export ${name || label} data`}
              >
                📤
              </button>
            )}
          </div>
        )}
      </div>

      {showAlerts && computedStatus === 'critical' && size !== 'compact' && (
        <div className={`${baseClass}__alert`}>
          <span className={`${baseClass}__alert-icon`}>⚠️</span>
          <span className={`${baseClass}__alert-text`}>
            Critical threshold reached
          </span>
        </div>
      )}
    </div>
  );
}; 