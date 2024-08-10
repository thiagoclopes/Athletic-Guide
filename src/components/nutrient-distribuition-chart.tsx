import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader } from '@/components/ui/card'


interface NutrientData {
    'proteinas': number,
    'carboidratos': number,
    'gordura': number,
}

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function NutrientDistributionChart({ data }: { data: NutrientData }) {
    const chartData = [
      { produto: 'Proteínas', amount: data.proteinas },
      { produto: 'Carboidratos', amount: data.carboidratos },
      { produto: 'Gordura', amount: data.gordura },
    ];
  
    return (
      <Card className="col-span-3">
        <CardHeader className="pb-8">
          <div className="flex items-center justify-between">
            <BarChart className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="produto"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {chartData[index].produto.length > 12
                        ? chartData[index].produto.substring(0, 12).concat('...')
                        : chartData[index].produto}{' '}
                      ({value})
                    </text>
                  );
                }}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }
