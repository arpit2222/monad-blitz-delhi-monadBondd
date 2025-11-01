"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface YieldBreakdownProps {
  principal: number;
  yieldEarned: number;
  daysHeld: number;
  annualRate: number;
}

export function YieldBreakdown({ 
  principal, 
  yieldEarned, 
  daysHeld = 30,
  annualRate = 4.2 
}: YieldBreakdownProps) {
  const yieldPercentage = principal > 0 ? (yieldEarned / principal) * 100 : 0;
  const dailyRate = annualRate / 365;
  
  // Generate mock daily data for the last 7 days
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const day = 7 - i;
    const dayYield = (principal * dailyRate * day) / 100;
    return { day, yield: dayYield };
  }).reverse();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Yield Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Principal</p>
            <p className="text-lg font-semibold">{principal.toLocaleString()} bonds</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Yield Earned</p>
            <p className="text-lg font-semibold">{yieldEarned.toFixed(2)} bonds</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Yield %</p>
            <p className="text-lg font-semibold">{yieldPercentage.toFixed(2)}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Annual Rate</p>
            <p className="text-lg font-semibold">{annualRate}%</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Time Held</span>
            <span>{daysHeld} days</span>
          </div>
          <Progress value={(daysHeld / 365) * 100} className="h-2" />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Daily Yield (Last 7 Days)</h4>
          <div className="space-y-2">
            {dailyData.map(({ day, yield: dayYield }) => (
              <div key={day} className="flex items-center">
                <span className="w-16 text-sm text-muted-foreground">
                  {day === 0 ? 'Today' : day === 1 ? 'Yesterday' : `${day}d ago`}
                </span>
                <div className="flex-1">
                  <Progress 
                    value={(dayYield / (yieldEarned || 1)) * 100} 
                    className="h-2"
                  />
                </div>
                <span className="ml-2 w-20 text-right text-sm font-medium">
                  +{dayYield.toFixed(4)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
