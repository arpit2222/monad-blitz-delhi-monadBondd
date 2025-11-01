"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface RedemptionFormProps {
  maxAmount: number;
  currentYield: number;
  onRedeem: (amount: number) => Promise<boolean>;
}

export function RedemptionForm({ maxAmount, currentYield, onRedeem }: RedemptionFormProps) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Calculate the total to be received (principal + yield)
  const calculateTotal = (val: string) => {
    const num = parseFloat(val) || 0;
    if (num <= 0) return { total: 0, yieldEarned: 0 };
    
    // Simple linear yield calculation - in a real app, this would be more complex
    const yieldEarned = (num * currentYield) / 100;
    return {
      total: num + yieldEarned,
      yieldEarned
    };
  };

  const { total, yieldEarned } = calculateTotal(amount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (numAmount > maxAmount) {
      setError(`You can't redeem more than your balance of ${maxAmount} MBS`);
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      const success = await onRedeem(numAmount);
      if (success) {
        setAmount('');
      }
    } catch (err) {
      setError('Failed to process redemption. Please try again.');
      console.error('Redemption error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount to Redeem (MBS)</Label>
        <Input
          id="amount"
          type="number"
          min="1"
          step="0.01"
          placeholder="Enter MBS amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Balance: {maxAmount.toLocaleString()} MBS</span>
          <button 
            type="button" 
            className="text-primary hover:underline"
            onClick={() => setAmount(maxAmount.toString())}
            disabled={isLoading}
          >
            Max
          </button>
        </div>
      </div>

      {amount && !isNaN(parseFloat(amount)) && (
        <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
          <div className="flex justify-between">
            <span className="text-muted-foreground">You'll receive</span>
            <span className="font-medium">{total.toFixed(2)} bonds</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Yield earned</span>
            <span className="text-green-600">+{yieldEarned.toFixed(2)} bonds</span>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      <Button 
        className="w-full" 
        onClick={handleSubmit}
        disabled={isLoading || !amount || parseFloat(amount) <= 0}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Redeem MBS'
        )}
      </Button>
    </div>
  );
}
