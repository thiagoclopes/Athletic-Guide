import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
const data = [
    { name: '1', weight: 70 },
    { name: '2', weight: 69.5 },
    { name: '3', weight: 69 },
    { name: '4', weight: 68.5 },
    { name: '5', weight: 68 },
    { name: '6', weight: 67.5 },
    { name: '7', weight: 67 },
    { name: '8', weight: 66.5 },
    { name: '9', weight: 66 },
    { name: '10', weight: 65.5 },
    { name: '11', weight: 65 },
    { name: '12', weight: 64.5 },
  ];
  

export function WeightChart() {
  const minWeight = Math.min(...data.map(d => d.weight));
  const maxWeight = Math.max(...data.map(d => d.weight));

  const [goal, setGoal] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const weight = parseFloat((form.elements.namedItem('number') as HTMLInputElement).value);
    setGoal(weight);
    console.log('Goal weight:', weight);
  };
    
  return (
    <div className="px-2 h-full">
      <Card className="w-full h-full">
        <CardContent className="flex flex-col p-4 h-full">
          <div className="flex flex-row justify-between">
            <h6 className="text-lg font-semibold">Progresso Mensal</h6>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Definir meta</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Definir meta</DialogTitle>
                  <DialogDescription>
                    Defina o peso a ser alcançado
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="number" className="text-right">
                        Peso (kg)
                      </Label>
                      <Input
                        id="number"
                        placeholder='75'
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
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
                {goal !== null && (
                  <ReferenceLine y={goal} stroke="#82ca9d" strokeDasharray="3 3" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
