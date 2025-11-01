"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Coins, Lock, Zap, ArrowUpDown } from 'lucide-react';

interface CurrentStatusProps {
  mbsBalance: number;
  bondDeposit: number;
  accruedYield: number;
  timeLocked: number; // in days
  redemptionValue: number;
}

export function CurrentStatus({
  mbsBalance,
  bondDeposit,
  accruedYield,
  timeLocked,
  redemptionValue
}: CurrentStatusProps) {
  const formatTimeLocked = (days: number) => {
    if (days < 1) {
      const hours = Math.floor(days * 24);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    return `${days.toFixed(1)} ${days === 1 ? 'day' : 'days'}`;
  };

  const statusItems = [
    {
      icon: <Coins className="h-5 w-5 text-muted-foreground" />,
      label: 'MBS Balance',
      value: mbsBalance.toLocaleString(),
      unit: 'MBS'
    },
    {
      icon: <Lock className="h-5 w-5 text-muted-foreground" />,
      label: 'Bond Deposit',
      value: bondDeposit.toLocaleString(),
      unit: 'bonds'
    },
    {
      icon: <Zap className="h-5 w-5 text-muted-foreground" />,
      label: 'Accrued Yield',
      value: accruedYield.toFixed(2),
      unit: 'bonds',
      isYield: true
    },
    {
      icon: <Clock className="h-5 w-5 text-muted-foreground" />,
      label: 'Time Locked',
      value: formatTimeLocked(timeLocked)
    },
    {
      icon: <ArrowUpDown className="h-5 w-5 text-muted-foreground" />,
      label: 'Redemption Value',
      value: redemptionValue.toFixed(2),
      unit: 'bonds',
      isTotal: true
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Redemption Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {statusItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-muted">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                {item.unit && (
                  <p className="text-xs text-muted-foreground">{item.unit}</p>
                )}
              </div>
            </div>
            <p className={`text-lg font-semibold ${
              item.isYield ? 'text-green-600' : 
              item.isTotal ? 'text-primary' : ''
            }`}>
              {item.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
