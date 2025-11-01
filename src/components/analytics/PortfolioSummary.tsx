"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Lock, DollarSign, Coins, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PortfolioMetricProps {
  label: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  description?: string;
}

function PortfolioMetric({ label, value, change, icon, description }: PortfolioMetricProps) {
  return (
    <div className="flex items-start justify-between p-4 border rounded-lg">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold">{value}</p>
            {change && (
              <span className={`text-xs flex items-center ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUpRight className={`h-3 w-3 ${!change.isPositive ? 'rotate-90' : ''}`} />
                {change.value}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function PortfolioSummary() {
  // Mock data - in a real app, this would come from an API
  const portfolio = {
    totalMBS: 1250.75,
    totalBonds: 850.25,
    totalYield: 425.50,
    currentValue: 125000,
    dailyYield: 12.75,
    yieldChange: 2.5,
    apy: 8.25,
    nextReward: 3.25,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Portfolio Summary</CardTitle>
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PortfolioMetric
            label="Total MBS"
            value={portfolio.totalMBS.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            icon={<Coins className="h-5 w-5" />}
            change={{
              value: `+${portfolio.yieldChange.toFixed(2)}%`,
              isPositive: portfolio.yieldChange >= 0,
            }}
          />
          
          <PortfolioMetric
            label="Total Bonds Locked"
            value={portfolio.totalBonds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            icon={<Lock className="h-5 w-5" />}
            description={`≈ ${formatCurrency(portfolio.totalBonds * 100)}`}
          />
          
          <PortfolioMetric
            label="Total Yield Earned"
            value={formatCurrency(portfolio.totalYield)}
            icon={<TrendingUp className="h-5 w-5" />}
            change={{
              value: `+${portfolio.yieldChange.toFixed(2)}%`,
              isPositive: portfolio.yieldChange >= 0,
            }}
          />
          
          <PortfolioMetric
            label="Daily Yield"
            value={formatCurrency(portfolio.dailyYield)}
            icon={<DollarSign className="h-5 w-5" />}
            description={`APY: ${portfolio.apy}%`}
          />
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next Reward</span>
            <span className="font-medium">{portfolio.nextReward.toFixed(2)} MBS</span>
          </div>
          <Progress value={75} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Next in: 3h 24m</span>
            <span>75% to next reward</span>
          </div>
        </div>
        
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full">
            Deposit MBS
          </Button>
          <Button size="sm" className="w-full">
            Claim Rewards
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
