"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

type ArbitrageFormProps = {
  onSubmit: (amount: number) => Promise<void>;
  isExecuting: boolean;
  error?: string | null;
  success?: string | null;
};

export function ArbitrageForm({
  onSubmit,
  isExecuting,
  error,
  success,
}: ArbitrageFormProps) {
  const [amount, setAmount] = useState<number>(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || isNaN(amount)) {
      return;
    }
    await onSubmit(amount);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Execute Arbitrage</h3>
        <p className="text-sm text-muted-foreground">
          Enter the amount of USDC to use for the arbitrage
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <Input
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="max-w-[200px]"
              disabled={isExecuting}
            />
            <span className="ml-2 text-sm font-medium">USDC</span>
          </div>
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          
          {success && (
            <p className="text-sm text-green-500">{success}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
          disabled={isExecuting}
        >
          {isExecuting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Executing...
            </>
          ) : (
            'Execute Arbitrage'
          )}
        </Button>
      </form>
    </div>
  );
}
