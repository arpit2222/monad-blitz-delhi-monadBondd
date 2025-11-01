"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ArbitrageHistory } from '@/components/arbitrage/ArbitrageHistory';
import { mockArbitrageHistory } from '@/lib/mock/arbitrage';

export default function ArbitragePage() {
  const [selectedArbitrage, setSelectedArbitrage] = useState<string | null>(null);
  
  // In a real app, this would be fetched from your smart contract or API
  const stats = {
    totalProfit: 12500.75,
    totalTransactions: 42,
    successRate: 92.5,
    avgProfit: 297.64,
  };

  const handleRowClick = (id: string) => {
    setSelectedArbitrage(id);
  };

  const handleBack = () => {
    setSelectedArbitrage(null);
  };

  // If an arbitrage is selected, show its details
  if (selectedArbitrage) {
    const arbitrage = mockArbitrageHistory.find(a => a.id === selectedArbitrage);
    if (!arbitrage) return null;
    
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <ArbitrageHistory 
          data={[arbitrage]} 
          onRowClick={handleRowClick} 
          className="mb-8"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Arbitrage Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and analyze your arbitrage opportunities
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Arbitrage
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Profit" 
          value={`$${stats.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          description="All-time profit from arbitrage"
          trend="up"
          trendValue="12.5%"
        />
        <StatCard 
          title="Total Transactions" 
          value={stats.totalTransactions.toString()} 
          description="Successful arbitrage transactions"
        />
        <StatCard 
          title="Success Rate" 
          value={`${stats.successRate}%`} 
          description="Successful transactions"
          trend="up"
          trendValue="2.3%"
        />
        <StatCard 
          title="Avg. Profit" 
          value={`$${stats.avgProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          description="Per transaction"
        />
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
          </div>
        </div>

        <TabsContent value="history" className="space-y-4">
          <ArbitrageHistory 
            data={mockArbitrageHistory} 
            onRowClick={handleRowClick} 
          />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Settings panel coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

function StatCard({ title, value, description, trend, trendValue }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          {trend && trendValue && (
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
