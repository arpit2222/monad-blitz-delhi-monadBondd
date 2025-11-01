"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FeeType = {
  name: string;
  description: string;
  rate: string;
  usage: number;
  amount: number;
};

export function X402Panel() {
  // Mock data - in a real app, this would come from an API
  const fees: FeeType[] = [
    {
      name: 'Monitoring',
      description: 'Price checks and opportunity detection',
      rate: '$0.001 per check',
      usage: 1245,
      amount: 1.25
    },
    {
      name: 'Arbitrage Execution',
      description: 'Per successful arbitrage trade',
      rate: '$0.01 per trade',
      usage: 42,
      amount: 0.42
    }
  ];

  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const agentEarnings = totalFees * 0.8; // 80% to agent
  const platformFee = totalFees * 0.2; // 20% to platform

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            x402 Payment Model
            <Badge variant="outline" className="text-xs">Pay-per-use</Badge>
          </CardTitle>
          <Button variant="outline" size="sm">
            View History
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Current Billing Period</h3>
          
          <div className="space-y-3">
            {fees.map((fee) => (
              <div key={fee.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{fee.name}</p>
                  <p className="text-sm text-muted-foreground">{fee.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono">${fee.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {fee.usage.toLocaleString()} × {fee.rate}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between items-center py-2 border-t">
              <span className="font-medium">Total Fees</span>
              <span className="font-mono font-bold">${totalFees.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">Earnings & Fees</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Earnings (80%):</span>
                  <span className="font-mono">${agentEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee (20%):</span>
                  <span className="font-mono">${platformFee.toFixed(2)}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                You keep 80% of all earnings. Platform fee covers infrastructure and maintenance.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-200">Pay only for what you use</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                No subscriptions, no minimums. You're only charged for actual usage of the system.
                The more you earn, the more we earn - our incentives are aligned with your success.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-2">
          <Button>
            Pay ${totalFees.toFixed(2)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
