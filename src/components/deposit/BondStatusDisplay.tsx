"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BondStatusDisplayProps {
  mbsBalance: number;
  bondsLocked: number;
  totalYieldEarned: number;
  bondType?: string;
}

export function BondStatusDisplay({
  mbsBalance,
  bondsLocked,
  totalYieldEarned,
  bondType,
}: BondStatusDisplayProps) {
  const projectedMonthlyYield = (bondsLocked * 0.35).toFixed(2);
  const projectedYearlyYield = (bondsLocked * 4.2).toFixed(2);
  const collateralizationRatio = bondsLocked > 0 
    ? ((mbsBalance / bondsLocked) * 100).toFixed(2) 
    : '0.00';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bond Vault Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">MBS Balance</p>
            <p className="text-2xl font-bold">{mbsBalance.toLocaleString()} MBS</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Bonds Locked</p>
            <p className="text-2xl font-bold">
              {bondsLocked.toLocaleString()}
              {bondType && (
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  ({bondType})
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm font-medium text-muted-foreground mb-2">Yield Earned</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-lg font-semibold">${totalYieldEarned.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div>
              <p className="text-lg font-semibold">${projectedMonthlyYield}</p>
              <p className="text-xs text-muted-foreground">Projected (30d)</p>
            </div>
            <div>
              <p className="text-lg font-semibold">${projectedYearlyYield}</p>
              <p className="text-xs text-muted-foreground">Projected (1y)</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Collateralization Ratio</p>
              <p className="text-lg font-semibold">{collateralizationRatio}%</p>
            </div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${Math.min(100, parseFloat(collateralizationRatio))}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
