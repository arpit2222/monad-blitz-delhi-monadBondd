"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface YieldCalculatorProps {
  bondType: string;
  amount: number;
  bondYield: number;
}

const BOND_DETAILS = {
  'gov-10y': { name: '10-Year Government Bond', yield: 4.2 },
  'corp-a': { name: 'Corporate Bond A', yield: 5.1 },
  'treasury': { name: 'Treasury Bond', yield: 3.8 },
  'municipal': { name: 'Municipal Bond', yield: 4.5 },
};

export function YieldCalculator({ bondType, amount, bondYield }: YieldCalculatorProps) {
  if (!bondType || !amount) return null;

  const bondDetail = BOND_DETAILS[bondType as keyof typeof BOND_DETAILS] || BOND_DETAILS['gov-10y'];
  const mbsAmount = amount; // 1:1 conversion for now
  const monthlyYield = bondYield / 12;
  const dailyYield = bondYield / 365;
  const yearlyEarnings = (amount * bondYield) / 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Yield Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Deposit <span className="font-medium">{amount} bonds</span> → Get{' '}
            <span className="font-medium">{mbsAmount} MBS</span>
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Annual Yield</p>
              <p className="text-2xl font-bold">{bondYield}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Monthly</p>
              <p className="text-2xl font-bold">{monthlyYield.toFixed(2)}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Daily</p>
              <p className="text-2xl font-bold">{dailyYield.toFixed(4)}%</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm font-medium">Projected Yearly Earnings</p>
            <p className="text-2xl font-bold">
              ${yearlyEarnings.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">on {amount} bonds</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
