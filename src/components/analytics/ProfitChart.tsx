"use client";

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { format } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

interface ProfitDataPoint {
  date: Date;
  profit: number;
  cumulativeProfit: number;
}

function generateMockData(): ProfitDataPoint[] {
  const data: ProfitDataPoint[] = [];
  let cumulativeProfit = 0;
  const now = new Date();
  
  // Generate 90 days of data
  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random profit between -500 and 2000
    const profit = Math.floor(Math.random() * 2500) - 500;
    cumulativeProfit += Math.max(0, profit); // Only add positive profits
    
    data.push({
      date,
      profit,
      cumulativeProfit,
    });
  }
  
  return data;
}

const mockData = generateMockData();

function filterDataByRange(data: ProfitDataPoint[], range: TimeRange): ProfitDataPoint[] {
  const now = new Date();
  const filtered: ProfitDataPoint[] = [];
  let cutoffDate = new Date();
  
  switch (range) {
    case '7d':
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case '30d':
      cutoffDate.setDate(now.getDate() - 30);
      break;
    case '90d':
      cutoffDate.setDate(now.getDate() - 90);
      break;
    case '1y':
      cutoffDate.setFullYear(now.getFullYear() - 1);
      break;
    case 'all':
      return data; // Return all data
  }
  
  return data.filter(point => point.date >= cutoffDate);
}

function downloadCSV(data: ProfitDataPoint[]) {
  const headers = ['Date', 'Daily Profit', 'Cumulative Profit'];
  const csvRows = [
    headers.join(','),
    ...data.map(d => 
      [
        format(d.date, 'yyyy-MM-dd'),
        d.profit.toFixed(2),
        d.cumulativeProfit.toFixed(2)
      ].join(',')
    )
  ];
  
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `profit-data-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function ProfitChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const filteredData = filterDataByRange(mockData, timeRange);
  
  const chartData = {
    labels: filteredData.map(d => format(d.date, 'MMM d')),
    datasets: [
      {
        label: 'Cumulative Profit',
        data: filteredData.map(d => d.cumulativeProfit),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            const data = filteredData[context.dataIndex];
            return [
              `Date: ${format(data.date, 'MMM d, yyyy')}`,
              `Daily: $${data.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              `Cumulative: $${data.cumulativeProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            ];
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  };
  
  // Calculate stats
  const totalProfit = filteredData.length > 0 
    ? filteredData[filteredData.length - 1].cumulativeProfit 
    : 0;
    
  const lastDataPoint = filteredData[filteredData.length - 1];
  const previousDataPoint = filteredData[Math.max(0, filteredData.length - 2)];
  const profitChange = lastDataPoint && previousDataPoint
    ? ((lastDataPoint.cumulativeProfit - previousDataPoint.cumulativeProfit) / previousDataPoint.cumulativeProfit) * 100
    : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profit Over Time</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Total: ${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            {!isNaN(profitChange) && (
              <span className={`ml-2 flex items-center ${profitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitChange >= 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(profitChange).toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
            <Button
              variant="ghost"
              size="sm"
              className={timeRange === '7d' ? 'bg-muted' : ''}
              onClick={() => setTimeRange('7d')}
            >
              7D
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={timeRange === '30d' ? 'bg-muted' : ''}
              onClick={() => setTimeRange('30d')}
            >
              30D
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={timeRange === '90d' ? 'bg-muted' : ''}
              onClick={() => setTimeRange('90d')}
            >
              90D
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={timeRange === '1y' ? 'bg-muted' : ''}
              onClick={() => setTimeRange('1y')}
            >
              1Y
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={timeRange === 'all' ? 'bg-muted' : ''}
              onClick={() => setTimeRange('all')}
            >
              ALL
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => downloadCSV(filteredData)}
          >
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
