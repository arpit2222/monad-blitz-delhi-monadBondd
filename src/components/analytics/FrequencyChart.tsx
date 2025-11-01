"use client";

import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

// Types for the frequency data
type HourData = {
  hour: number;
  count: number;
};

type DayData = {
  day: string;
  count: number;
  hours: HourData[];
};

// Generate mock data for arbitrage frequency
function generateMockData(): DayData[] {
  const dayData = DAYS.map(day => ({
    day,
    count: Math.floor(Math.random() * 50) + 10, // 10-60 per day
    hours: HOURS.map(hour => ({
      hour,
      count: Math.floor(Math.random() * 15) * (hour >= 9 && hour <= 17 ? 2 : 1), // More during business hours
    })),
  }));
  
  return dayData;
}

const mockData = generateMockData();

export function FrequencyChart() {
  // Find the hour with the most arbitrages
  const peakHour = mockData.reduce<{hour: number; count: number}>((acc, day) => {
    const peak = day.hours.reduce((max, hour) => 
      hour.count > max.count ? hour : max, { hour: 0, count: 0 }
    );
    return peak.count > acc.count ? peak : acc;
  }, { hour: 0, count: 0 });

  const chartData = {
    labels: DAYS,
    datasets: [
      {
        label: 'Arbitrage Count',
        data: mockData.map((d: DayData) => d.count),
        backgroundColor: (context: any) => {
          const dayIndex = context.dataIndex;
          return DAYS[dayIndex] === 'Wednesday' ? '#10b981' : '#3b82f6';
        },
        borderColor: (context: any) => {
          const dayIndex = context.dataIndex;
          return DAYS[dayIndex] === 'Wednesday' ? '#0d9c6f' : '#2563eb';
        },
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: (context: any) => {
          const dayIndex = context.dataIndex;
          return DAYS[dayIndex] === 'Wednesday' ? '#0d9c6f' : '#2563eb';
        },
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
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y} arbitrages`;
          },
          afterLabel: function(context: any) {
            const dayData = mockData[context.dataIndex] as DayData;
            const total = dayData.hours.reduce((sum: number, h: HourData) => sum + h.count, 0);
            const avgPerHour = (total / 24).toFixed(1);
            return [
              `Avg: ${avgPerHour}/hour`,
              `Peak: ${Math.max(...dayData.hours.map(h => h.count))} at ${Math.max(...dayData.hours.map(h => h.count))}:00`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Day of Week',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Arbitrages',
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        console.log(`Clicked on ${DAYS[index]}`);
        // You could add functionality to show hourly breakdown here
      }
    },
  };

  function downloadCSV() {
    const headers = ['Day', 'Total Arbitrages', 'Peak Hour', 'Peak Count', 'Average per Hour'];
    const csvRows = [
      headers.join(','),
      ...mockData.map(day => {
        const peak = day.hours.reduce<{hour: number; count: number}>(
          (max, hour) => hour.count > max.count ? hour : max, 
          { hour: 0, count: 0 }
        );
        const avgPerHour = (day.count / 24).toFixed(1);
        
        return [
          day.day,
          day.count,
          `${peak.hour}:00`,
          peak.count,
          avgPerHour,
        ].join(',');
      })
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `arbitrage-frequency-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Arbitrage Frequency</CardTitle>
          <p className="text-sm text-muted-foreground">
            Peak activity on {DAYS[3]} at {peakHour.hour}:00 ({peakHour.count} transactions)
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadCSV}
        >
          <Download className="h-4 w-4 mr-2" />
          CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <Bar data={chartData} options={options} />
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span>Normal day: Average activity</span>
          </p>
          <p className="flex items-center mt-1">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
            <span>Peak day: Higher than average activity</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
