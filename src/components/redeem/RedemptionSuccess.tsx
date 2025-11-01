"use client";

import { CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface RedemptionSuccessProps {
  transactionHash: string;
  bondsReceived: number;
  yieldEarned: number;
  newMBSBalance: number;
  onDepositMore?: () => void;
}

export function RedemptionSuccess({
  transactionHash,
  bondsReceived,
  yieldEarned,
  newMBSBalance,
  onDepositMore
}: RedemptionSuccessProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Redemption Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction</span>
            <a 
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center"
            >
              {`${transactionHash.slice(0, 6)}...${transactionHash.slice(-4)}`}
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
          
          <div className="space-y-2 pt-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bonds Received</span>
              <span className="font-medium">{bondsReceived.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Yield Earned</span>
              <span className="text-green-600">+{yieldEarned.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-muted-foreground">New MBS Balance</span>
              <span className="font-semibold">{newMBSBalance.toLocaleString()} MBS</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-4">
          {onDepositMore && (
            <Button onClick={onDepositMore} className="w-full">
              Deposit More Bonds
            </Button>
          )}
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard">
              View Dashboard
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
