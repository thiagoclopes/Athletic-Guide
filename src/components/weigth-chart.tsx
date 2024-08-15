import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from './ui/card';
const data = [
    { name: '1', weight: 70, goal: 68 },
    { name: '2', weight: 69.5, goal: 68 },
    { name: '3', weight: 69, goal: 68 },
    { name: '4', weight: 68.5, goal: 68 },
    { name: '5', weight: 68, goal: 68 },
    { name: '6', weight: 67.5, goal: 68 },
    { name: '7', weight: 67, goal: 68 },
    { name: '8', weight: 66.5, goal: 68 },
    { name: '9', weight: 66, goal: 68 },
    { name: '10', weight: 65.5, goal: 68 },
    { name: '11', weight: 65, goal: 68 },
    { name: '12', weight: 64.5, goal: 68 },
  ];
  

export function WeightChart() {
  const minWeight = Math.min(...data.map(d => d.weight));
  const maxWeight = Math.max(...data.map(d => d.weight));

  return (
    <div className="py-4 px-2 h-full">
      <Card className="w-full h-full">
        <CardContent className="flex flex-col p-4 h-full">
          <h6 className="text-lg font-semibold">Progresso Mensal</h6>
          <div className="flex-grow mx-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Legend
                  verticalAlign="top"
                  align="left"
                  wrapperStyle={{ paddingBottom: 20 }}
                />
                <XAxis dataKey="name" />
                <YAxis domain={[minWeight - 1, maxWeight + 1]} tickCount={5} />
                <Tooltip />
                <Line dataKey="weight" stroke="#8884d8" dot={false} />
                <Line dataKey="goal" stroke="#82ca9d" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
