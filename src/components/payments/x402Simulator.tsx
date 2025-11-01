"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';

const MONITORING_RATE = 0.001;
const ARBITRAGE_RATE = 0.01;
const SUBSCRIPTION_PRICE = 29.99;

type UsageRates = {
  monitoringCalls: number;
  arbitrageTrades: number;
};

export function X402Simulator() {
  const [showComparison, setShowComparison] = useState(true);
  const [usage, setUsage] = useState<UsageRates>({
    monitoringCalls: 1000,
    arbitrageTrades: 50,
  });

  const calculateCosts = useMemo(() => {
    const monitoringCost = usage.monitoringCalls * MONITORING_RATE;
    const arbitrageCost = usage.arbitrageTrades * ARBITRAGE_RATE;
    const totalCost = monitoringCost + arbitrageCost;
    const savings = showComparison ? Math.max(0, SUBSCRIPTION_PRICE - totalCost) : 0;
    const isCheaper = totalCost < SUBSCRIPTION_PRICE;
    const breakeven = Math.ceil((SUBSCRIPTION_PRICE - monitoringCost) / ARBITRAGE_RATE);

    return {
      monitoringCost,
      arbitrageCost,
      totalCost,
      savings,
      isCheaper,
      breakeven,
    };
  }, [usage, showComparison]);

  const handleSliderChange = (value: number[], type: keyof UsageRates) => {
    setUsage(prev => ({
      ...prev,
      [type]: value[0],
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Simulator</CardTitle>
        <p className="text-sm text-muted-foreground">
          Estimate your costs based on expected usage
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="monitoring-slider">
                Monitoring Checks: <span className="font-mono">{usage.monitoringCalls.toLocaleString()}</span>
              </Label>
              <span className="text-sm font-mono">
                ${(usage.monitoringCalls * MONITORING_RATE).toFixed(2)}
              </span>
            </div>
            <Slider
              id="monitoring-slider"
              min={100}
              max={10000}
              step={100}
              value={[usage.monitoringCalls]}
              onValueChange={(value) => handleSliderChange(value, 'monitoringCalls')}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100 checks</span>
              <span>10,000 checks</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ${MONITORING_RATE} per check
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="arbitrage-slider">
                Arbitrage Trades: <span className="font-mono">{usage.arbitrageTrades}</span>
              </Label>
              <span className="text-sm font-mono">
                ${(usage.arbitrageTrades * ARBITRAGE_RATE).toFixed(2)}
              </span>
            </div>
            <Slider
              id="arbitrage-slider"
              min={0}
              max={500}
              step={1}
              value={[usage.arbitrageTrades]}
              onValueChange={(value) => handleSliderChange(value, 'arbitrageTrades')}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 trades</span>
              <span>500 trades</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ${ARBITRAGE_RATE} per trade
            </p>
          </div>
        </div>

        <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
          <div className="flex justify-between">
            <span>Monitoring Cost:</span>
            <span className="font-mono">${calculateCosts.monitoringCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Arbitrage Cost:</span>
            <span className="font-mono">${calculateCosts.arbitrageCost.toFixed(2)}</span>
          </div>
          <div className="h-px bg-border my-2"></div>
          <div className="flex justify-between font-medium">
            <span>Total Estimated Cost:</span>
            <span className="font-mono">${calculateCosts.totalCost.toFixed(2)}</span>
          </div>
          
          {showComparison && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between">
                <span>Subscription Alternative:</span>
                <span className="font-mono">${SUBSCRIPTION_PRICE.toFixed(2)}/month</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Your Savings:</span>
                <span className={`font-mono ${calculateCosts.isCheaper ? 'text-green-600' : 'text-red-600'}`}>
                  {calculateCosts.isCheaper ? '+' : '-'}${Math.abs(calculateCosts.savings).toFixed(2)}
                </span>
              </div>
              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md text-sm">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <div>
                    {calculateCosts.isCheaper ? (
                      <p>The pay-per-use model saves you <span className="font-medium">${calculateCosts.savings.toFixed(2)}</span> compared to a subscription.</p>
                    ) : (
                      <p>A subscription would save you <span className="font-medium">${Math.abs(calculateCosts.savings).toFixed(2)}</span> at this usage level.</p>
                    )}
                    {!calculateCosts.isCheaper && usage.arbitrageTrades > 0 && (
                      <p className="mt-1">
                        Breakeven at <span className="font-medium">{calculateCosts.breakeven} trades</span> with {usage.monitoringCalls.toLocaleString()} checks.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
          <div className="space-y-0.5">
            <Label htmlFor="comparison-toggle" className="flex items-center gap-2">
              Compare with Subscription
            </Label>
            <p className="text-xs text-muted-foreground">
              See how much you save compared to traditional pricing
            </p>
          </div>
          <Switch
            id="comparison-toggle"
            checked={showComparison}
            onCheckedChange={setShowComparison}
          />
        </div>
      </CardContent>
    </Card>
  );
}
