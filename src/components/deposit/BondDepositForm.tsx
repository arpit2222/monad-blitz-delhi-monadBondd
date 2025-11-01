"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface BondDepositFormProps {
  bondType: string;
  onDeposit: (amount: number) => Promise<void>;
}

export function BondDepositForm({ bondType, onDeposit }: BondDepositFormProps) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      await onDeposit(numAmount);
    } catch (err) {
      setError('Failed to process deposit. Please try again.');
      console.error('Deposit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount to Deposit</Label>
        <Input
          id="amount"
          type="number"
          min="1"
          step="1"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
        <p className="text-sm text-muted-foreground">
          Minimum deposit: 1 bond
        </p>
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      <Button 
        className="w-full" 
        onClick={handleSubmit}
        disabled={isLoading || !bondType || !amount}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Approve & Deposit'
        )}
      </Button>
    </div>
  );
}
