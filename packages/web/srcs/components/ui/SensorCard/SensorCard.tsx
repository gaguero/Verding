const getStatusLevel = (value: number, thresholds: SensorThreshold | undefined, currentStatus: SensorStatus): SensorStatus => {
  if (!thresholds) {
    return currentStatus; // Return current status if no thresholds are defined
  }
  const { optimal, warning, critical } = thresholds;
  
  if (value >= optimal.min && value <= optimal.max) return 'optimal';
  if (value >= warning.min && value <= warning.max) return 'warning';
  if (value >= critical.min && value <= critical.max) return 'critical';
  return currentStatus;
};

const { type, value, thresholds, status } = sensor;

const icon = SENSOR_ICONS[type];
const label = SENSOR_LABELS[type];
const computedStatus = status === 'offline' || status === 'calibrating' ? status : getStatusLevel(value, thresholds, status);

const baseClass = 'vrd-sensor-card';
const classes = [
// ... existing code ...
]; 