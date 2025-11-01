import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, Shield, DollarSign } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
};

const StatCard = ({ title, value, icon, description }: StatCardProps) => {
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
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

type QuickStatsProps = {
  totalArbitrages: number;
  totalProfit: number;
  mevProtected: number;
  avgExecutionTime: string;
};

export function QuickStats({
  totalArbitrages = 0,
  totalProfit = 0,
  mevProtected = 0,
  avgExecutionTime = '0s',
}: Partial<QuickStatsProps>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Arbitrages"
        value={totalArbitrages}
        icon={<TrendingUp className="h-4 w-4" />}
        description="Today"
      />
      <StatCard
        title="Total Profit"
        value={`$${totalProfit.toFixed(2)}`}
        icon={<DollarSign className="h-4 w-4" />}
        description="Today"
      />
      <StatCard
        title="MEV Protected"
        value={`$${mevProtected.toFixed(2)}`}
        icon={<Shield className="h-4 w-4" />}
        description="Saved from MEV"
      />
      <StatCard
        title="Avg. Execution Time"
        value={avgExecutionTime}
        icon={<Clock className="h-4 w-4" />}
      />
    </div>
  );
}
