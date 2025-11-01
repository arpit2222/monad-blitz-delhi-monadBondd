"use client";

import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface DepositSuccessProps {
  transactionHash: string;
  mbsReceived: number;
  bondType: string;
  currentBalance: number;
}

const BOND_NAMES: { [key: string]: string } = {
  'gov-10y': '10-Year Government Bond',
  'corp-a': 'Corporate Bond A',
  'treasury': 'Treasury Bond',
  'municipal': 'Municipal Bond',
};

export function DepositSuccess({
  transactionHash,
  mbsReceived,
  bondType,
  currentBalance,
}: DepositSuccessProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Deposit Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            You've received
          </p>
          <p className="text-3xl font-bold">{mbsReceived} MBS</p>
          <p className="text-sm text-muted-foreground">
            From {BOND_NAMES[bondType] || bondType}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction</span>
            <a 
              href={`https://etherscan.io/tx/${transactionHash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {`${transactionHash.slice(0, 6)}...${transactionHash.slice(-4)}`}
            </a>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">New MBS Balance</span>
            <span>{currentBalance} MBS</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-4">
          <Button asChild>
            <Link href="/dashboard">
              View Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/analytics">
              View Analytics
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
