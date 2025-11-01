"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type TimelineStep = {
  id: string;
  label: string;
  startTime: number; // in seconds
  duration: number; // in seconds
  color: string;
};

interface ExecutionTimelineProps {
  executionTime: number; // in seconds
  ethereumExecutionTime?: number; // in seconds
  className?: string;
}

export function ExecutionTimeline({ 
  executionTime = 0.18, 
  ethereumExecutionTime = 4.5,
  className = '' 
}: ExecutionTimelineProps) {
  const maxTime = Math.max(executionTime, ethereumExecutionTime);
  
  const steps: TimelineStep[] = [
    {
      id: 'buy',
      label: 'Buy on Market A',
      startTime: 0,
      duration: executionTime * 0.4, // 40% of total time
      color: 'bg-blue-500',
    },
    {
      id: 'sell',
      label: 'Sell on Market B',
      startTime: 0.05, // Start slightly after buy
      duration: executionTime * 0.5, // 50% of total time
      color: 'bg-green-500',
    },
  ];

  const calculatePosition = (time: number) => (time / maxTime) * 100;
  const calculateWidth = (duration: number) => (duration / maxTime) * 100;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Execution Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium">Parallel Execution (Monad)</h3>
            <span className="text-sm text-muted-foreground">
              {executionTime.toFixed(2)}s total
            </span>
          </div>
          
          <div className="relative h-16">
            {steps.map((step) => (
              <div 
                key={step.id}
                className="absolute h-8 rounded-md flex items-center px-2 text-white text-xs font-medium"
                style={{
                  left: `${calculatePosition(step.startTime)}%`,
                  width: `${calculateWidth(step.duration)}%`,
                  backgroundColor: step.color,
                  top: step.id === 'buy' ? '0' : '50%',
                }}
              >
                {step.label}
              </div>
            ))}
            
            {/* Time axis */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
            
            {/* Time markers */}
            {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].map((time) => (
              <div 
                key={time} 
                className="absolute bottom-0 w-px h-2 bg-border -mb-2"
                style={{ left: `${calculatePosition(time)}%` }}
              >
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  {time}s
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium">Sequential Execution (Ethereum)</h3>
            <span className="text-sm text-muted-foreground">
              {ethereumExecutionTime.toFixed(1)}s total
            </span>
          </div>
          
          <div className="relative h-16">
            <div 
              className="absolute top-0 left-0 h-8 rounded-md bg-blue-500 flex items-center px-2 text-white text-xs font-medium"
              style={{
                width: `${calculateWidth(ethereumExecutionTime * 0.4)}%`,
              }}
            >
              Buy on Market A
            </div>
            
            <div 
              className="absolute top-1/2 left-0 h-8 rounded-md bg-green-500 flex items-center px-2 text-white text-xs font-medium"
              style={{
                left: `${calculateWidth(ethereumExecutionTime * 0.4 + 0.5)}%`,
                width: `${calculateWidth(ethereumExecutionTime * 0.5)}%`,
              }}
            >
              Sell on Market B
            </div>
            
            {/* Time axis */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
            
            {/* Time markers */}
            {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].map((time) => (
              <div 
                key={time} 
                className="absolute bottom-0 w-px h-2 bg-border -mb-2"
                style={{ left: `${calculatePosition(time)}%` }}
              >
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  {time}s
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Speed Improvement</p>
              <p className="text-sm text-muted-foreground">
                Monad is {Math.round(ethereumExecutionTime / executionTime)}x faster than Ethereum
              </p>
            </div>
            <div className="text-2xl font-bold text-green-600">
              -{Math.round((1 - (executionTime / ethereumExecutionTime)) * 100)}% time
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
