import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import React from 'react';
import { Card } from '@mui/material';
const data = [
    { name: 'Semana 1', weight: 70, goal: 68 },
    { name: 'Semana 2', weight: 69.5, goal: 68 },
    { name: 'Semana 3', weight: 69, goal: 68 },
    { name: 'Semana 4', weight: 68.5, goal: 68 },
    { name: 'Semana 5', weight: 68, goal: 68 },
    { name: 'Semana 6', weight: 67.5, goal: 68 },
    { name: 'Semana 7', weight: 67, goal: 68 },
    { name: 'Semana 8', weight: 66.5, goal: 68 },
    { name: 'Semana 9', weight: 66, goal: 68 },
    { name: 'Semana 10', weight: 65.5, goal: 68 },
    { name: 'Semana 11', weight: 65, goal: 68 },
    { name: 'Semana 12', weight: 64.5, goal: 68 },
  ];
  

export function WeightChart() {
  const minWeight = Math.min(...data.map(d => d.weight));
  const maxWeight = Math.max(...data.map(d => d.weight));

  return (
    <div style={{ padding: '5%' }}>
      <Card sx={{ height: '60vh' }}>
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[minWeight - 1, maxWeight + 1]} tickCount={5} /> {/* Ajustar o domínio */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          <Line type="monotone" dataKey="goal" stroke="#82ca9d" />
        </LineChart>
      </Card>
    </div>
  );
}
