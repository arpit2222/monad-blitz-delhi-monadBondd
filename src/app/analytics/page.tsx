"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { MetricsGrid } from '@/components/analytics/MetricsGrid';
import { ProfitChart } from '@/components/analytics/ProfitChart';
import { FrequencyChart } from '@/components/analytics/FrequencyChart';

export default function AnalyticsPage() {
  // In a real app, this data would come from an API
  const stats = {
    totalArbitrages: 1284,
    totalProfit: 64289.42,
    mevSaved: 128578.84,
    avgExecutionTime: 0.18,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track performance and analyze arbitrage opportunities
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export All Data
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profit">Profit Analysis</TabsTrigger>
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MetricsGrid />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit Over Time</CardTitle>
                <CardDescription>
                  Last 30 days of arbitrage profit
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ProfitChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Arbitrage Frequency</CardTitle>
                <CardDescription>
                  Distribution of arbitrage activity by day of week
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <FrequencyChart />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key metrics for your arbitrage strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
                <div className="text-2xl font-bold">92.5%</div>
                <p className="text-sm text-green-600 flex items-center">
                  <span className="font-medium">+2.3%</span>
                  <span className="ml-1 text-xs">vs last month</span>
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Avg. Profit per Trade</h3>
                <div className="text-2xl font-bold">$1,892.04</div>
                <p className="text-sm text-green-600 flex items-center">
                  <span className="font-medium">+5.1%</span>
                  <span className="ml-1 text-xs">vs last month</span>
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Gas Spent</h3>
                <div className="text-2xl font-bold">12.84 ETH</div>
                <p className="text-sm text-green-600">
                  <span className="font-medium">Saved 45%</span>
                  <span className="ml-1 text-xs">vs Ethereum mainnet</span>
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Active Strategies</h3>
                <div className="text-2xl font-bold">8</div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">3</span>
                  <span className="ml-1">performing above target</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profit Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of arbitrage profits over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <ProfitChart />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Profit by Asset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Asset distribution chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="frequency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Arbitrage Frequency</CardTitle>
              <CardDescription>
                Analysis of when arbitrage opportunities occur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <FrequencyChart />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Hourly Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Hourly distribution chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="markets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Analysis</CardTitle>
              <CardDescription>
                Performance across different markets and pairs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                Market analysis dashboard will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
