"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface StatItemProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
}

function StatItem({ label, value, icon, description }: StatItemProps) {
  return (
    <div className="flex items-start justify-between py-3">
      <div className="flex items-start space-x-3">
        {icon && (
          <div className="p-1.5 rounded-md bg-muted">
            {icon}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function AgentStats() {
  // Mock data - in a real app, this would come from an API
  const stats = {
    status: 'online' as 'online' | 'offline',
    uptime: '24/7',
    lastPriceCheck: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    priceChecksToday: 1245,
    opportunitiesFound: 42,
    successfulExecutions: 38,
    failedExecutions: 4,
    lastError: 'Connection timeout to DEX API',
  };

  const successRate = (stats.successfulExecutions / (stats.successfulExecutions + stats.failedExecutions)) * 100;
  const lastCheck = Math.floor((Date.now() - stats.lastPriceCheck.getTime()) / 60000);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Agent Status</CardTitle>
          <Badge 
            variant={stats.status === 'online' ? 'default' : 'destructive'}
            className="flex items-center gap-1"
          >
            {stats.status === 'online' ? (
              <>
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Online
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                Offline
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatItem 
            label="Uptime"
            value={stats.uptime}
            icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
          />
          
          <StatItem 
            label="Last Price Check"
            value={lastCheck === 0 ? 'Just now' : `${lastCheck}m ago`}
            icon={<Clock className="h-4 w-4 text-blue-500" />}
          />
          
          <StatItem 
            label="Price Checks Today"
            value={stats.priceChecksToday.toLocaleString()}
            icon={<RefreshCw className="h-4 w-4 text-purple-500" />}
            description="≈ 1 check every 30s"
          />
          
          <StatItem 
            label="Opportunities Found"
            value={stats.opportunitiesFound}
            icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
          />
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Execution Success Rate</span>
            <span className="font-medium">{successRate.toFixed(1)}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${successRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Successful: {stats.successfulExecutions}</span>
            <span>Failed: {stats.failedExecutions}</span>
          </div>
        </div>
        
        {stats.failedExecutions > 0 && (
          <div className="p-3 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Last Error</p>
                <p className="text-xs">{stats.lastError}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-2">
          <Button variant="outline" size="sm" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Agent Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
