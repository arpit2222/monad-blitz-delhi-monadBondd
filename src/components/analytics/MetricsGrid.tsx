"use client";

import { ArrowUp, ArrowDown, TrendingUp, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  icon: React.ReactNode;
};

function MetricCard({ title, value, description, trend, trendValue, icon }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-500',
  };

  const trendIcons = {
    up: <ArrowUp className="h-4 w-4" />,
    down: <ArrowDown className="h-4 w-4" />,
    neutral: <span className="h-4 w-4" />,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`mt-2 flex items-center text-xs ${trendColors[trend]}`}>
          {trendIcons[trend]}
          <span className="ml-1">{trendValue}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsGrid() {
  // In a real app, this data would come from an API
  const metrics = [
    {
      title: "Total Arbitrages",
      value: "1,284",
      description: "42 today • 298 this week • 1,284 this month",
      trend: "up" as const,
      trendValue: "+12.5% from last month",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Total Profit",
      value: "$64,289.42",
      description: "$1,892.04 average per trade",
      trend: "up" as const,
      trendValue: "+8.2% from last month",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "MEV Saved",
      value: "$128,578.84",
      description: "3.5% of total volume",
      trend: "up" as const,
      trendValue: "Saved 45% vs Ethereum",
      icon: <Zap className="h-4 w-4" />,
    },
    {
      title: "Avg. Execution Time",
      value: "0.18s",
      description: "4.5s on Ethereum",
      trend: "up" as const,
      trendValue: "25x faster than Ethereum",
      icon: <Clock className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
