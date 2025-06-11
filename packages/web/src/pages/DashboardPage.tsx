import React from 'react';
import { Layout } from '@/components/Layout';
// import { Button } from '@/components/ui';
// import { SensorCard } from '@/components/ui';
// import { ResourcePanel } from '@/components/ui';
import { usePropertyStore } from '@/stores/propertyStore';
// import styles from '@/styles/components.module.css';

/* eslint-disable max-len */

export function DashboardPage() {
  const { isLoading } = usePropertyStore();

  if (isLoading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/*
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Welcome!</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This is a minimal working dashboard. We will rebuild the missing components from here.
            </p>
            <Button variant="primary">Example Button</Button>
          </CardContent>
        </Card>

        
        <MetricsDashboard
          propertyContext={{ propertyId: 'prop-123', propertyName: 'Greenfield Farms' }}
          metrics={[
            { id: 'metric-1', title: 'Total Yield', value: '1,250 kg', trend: '+5%', period: 'last 30 days' },
            { id: 'metric-2', title: 'Water Usage', value: '8,500 L', trend: '-2%', period: 'last 30 days' },
            { id: 'metric-3', title: 'Energy Consumption', value: '1,200 kWh', trend: '+1%', period: 'last 30 days' },
            { id: 'metric-4', title: 'Operational Efficiency', value: '92%', trend: '+3%', period: 'last 30 days' },
          ]}
          mainChartData={{
            series: [{ name: 'Yield', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }],
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }}
        />
        

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          <SensorCard
            sensor={{ id: 'temp-1', type: 'temperature', value: 24.5, unit: '°C', status: 'optimal', timestamp: new Date(), location: 'Zone A' }}
            size="compact"
          />
          <SensorCard
            sensor={{ id: 'hum-1', type: 'humidity', value: 65, unit: '%', status: 'warning', timestamp: new Date(), location: 'Zone A' }}
            size="compact"
          />
          <SensorCard
            sensor={{ id: 'ph-1', type: 'ph', value: 6.2, unit: '', status: 'optimal', timestamp: new Date(), location: 'Zone B' }}
            size="compact"
          />
        </div>
        

        
        <ResourcePanel
          title="Equipment Status"
          resources={[
            { id: 'equip-1', name: 'Tractor A', type: 'Vehicle', status: 'Available', details: 'Next maintenance: 2 weeks' },
            { id: 'equip-2', name: 'Seeder B', type: 'Machine', status: 'In Use', details: 'Currently in Field 4' },
            { id: 'equip-3', name: 'Harvester C', type: 'Machine', status: 'Maintenance', details: 'Scheduled until 06/25' },
            { id: 'supply-1', name: 'Organic Fertilizer', type: 'Supply', status: 'Low Stock', details: '15 bags remaining' },
          ]}
        />
        */}
        
      </div>
    </Layout>
  );
} 
