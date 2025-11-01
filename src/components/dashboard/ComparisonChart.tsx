import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ZapOff } from 'lucide-react';

type ComparisonData = {
  name: string;
  speed: number;
  mevLoss: number;
  profit: number;
  color: string;
};

export function ComparisonChart() {
  const data: ComparisonData[] = [
    {
      name: 'Ethereum',
      speed: 4.5,
      mevLoss: 48,
      profit: 20,
      color: '#627EEA', // Ethereum blue
    },
    {
      name: 'Monad',
      speed: 0.18,
      mevLoss: 0,
      profit: 100,
      color: '#00FF9C', // Monad green
    },
  ];

  const speedup = (data[0].speed / data[1].speed).toFixed(0);
  const profitImprovement = ((data[1].profit - data[0].profit) / data[0].profit * 100).toFixed(0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 border rounded-lg shadow-lg">
          <p className="font-bold">{label}</p>
          <p>Speed: {payload[0].value}s</p>
          <p>MEV Loss: ${payload[1].value}</p>
          <p>Profit: {payload[2].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Performance Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barCategoryGap={30}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  yAxisId="left" 
                  orientation="left" 
                  stroke="#888" 
                  tickFormatter={(value) => `${value}s`}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#888"
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="speed" 
                  name="Execution Time (s)" 
                  radius={[4, 4, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList 
                    dataKey="speed" 
                    position="top" 
                    formatter={(value: unknown) => `${value as number}s`}
                    fill="currentColor"
                  />
                </Bar>
                <Bar 
                  yAxisId="right" 
                  dataKey="profit" 
                  name="Profit %" 
                  radius={[4, 4, 0, 0]}
                  fillOpacity={0.7}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-profit-${index}`} fill={entry.color} fillOpacity={0.5} />
                  ))}
                  <LabelList 
                    dataKey="profit" 
                    position="top" 
                    formatter={(value: unknown) => `${value}%`}
                    fill="currentColor"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Key Metrics</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>Speedup</span>
                  </div>
                  <span className="font-bold">{speedup}x Faster</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ZapOff className="h-4 w-4 text-red-500" />
                    <span>MEV Protection</span>
                  </div>
                  <span className="font-bold text-green-500">100% Protected</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span>Profit Improvement</span>
                  </div>
                  <span className="font-bold text-green-500">+{profitImprovement}%</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Why Monad?</h4>
              <p className="text-sm text-muted-foreground">
                Monad's parallel execution and optimized EVM implementation deliver significant 
                performance improvements over traditional blockchains like Ethereum, resulting 
                in faster transactions, better MEV protection, and higher profits for traders.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
