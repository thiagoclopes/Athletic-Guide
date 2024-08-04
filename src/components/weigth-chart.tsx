import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
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
    <Card sx={{ width: '100%', height: '100%' }}>
        <CardContent sx={{ height: '40vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Progresso Mensal
            </Typography>
            <div style={{ flexGrow: 1 }}>
                <ResponsiveContainer width="90%" height="100%">
                    <LineChart data={data}>
                        <Legend
                            verticalAlign="top"
                            align="left"
                            wrapperStyle={{ paddingBottom: 20 }} // Espaçamento inferior para a legenda
                        />
                        <XAxis dataKey="name" />
                        <YAxis domain={[minWeight - 1, maxWeight + 1]} tickCount={5} />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                        <Line type="monotone" dataKey="goal" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);
}
