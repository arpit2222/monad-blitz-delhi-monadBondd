"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
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

export function ExecutionTimeComparison() {
  const data = {
    labels: ['Monad', 'Ethereum'],
    datasets: [
      {
        label: 'Execution Time (seconds)',
        data: [0.18, 4.5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // Blue for Monad
          'rgba(239, 68, 68, 0.8)',  // Red for Ethereum
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.x.toFixed(2)} seconds`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Execution Time (seconds)',
        },
        ticks: {
          callback: function(value: any) {
            return value + 's';
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuad'
    } as const,
  };

  const speedup = (4.5 / 0.18).toFixed(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Time Comparison</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monad is {speedup}x faster than Ethereum for arbitrage execution
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Bar data={data} options={options} />
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start">
            <div className="h-3 w-3 rounded-full bg-blue-500 mt-1 mr-2"></div>
            <div>
              <h4 className="font-medium">Monad (0.18s)</h4>
              <p className="text-sm text-muted-foreground">
                Parallel execution and optimized state access enable near-instant arbitrage execution.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-3 w-3 rounded-full bg-red-500 mt-1 mr-2"></div>
            <div>
              <h4 className="font-medium">Ethereum (4.5s)</h4>
              <p className="text-sm text-muted-foreground">
                Sequential execution and block time constraints lead to slower execution and more MEV opportunities.
              </p>
            </div>
          </div>
          
          <div className="pt-4 mt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Speedup Factor</h4>
                <p className="text-sm text-muted-foreground">
                  How much faster Monad is compared to Ethereum
                </p>
              </div>
              <div className="text-2xl font-bold text-blue-600">{speedup}x</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
