"use client";

import { useState } from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { CurrentStatus } from '@/components/redeem/CurrentStatus';
import { RedemptionForm } from '@/components/redeem/RedemptionForm';
import { YieldBreakdown } from '@/components/redeem/YieldBreakdown';
import { RedemptionSuccess } from '@/components/redeem/RedemptionSuccess';
import { RedemptionHistory, mockRedemptions } from '@/components/redeem/RedemptionHistory';

export default function RedeemPage() {
  // Mock data - in a real app, this would come from your smart contract or API
  const [userData, setUserData] = useState({
    mbsBalance: 1250.75,
    bondDeposit: 1000,
    accruedYield: 42.50,
    timeLocked: 30.5, // days
    currentYieldRate: 4.2, // annual percentage
    isLocked: false
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastRedemption, setLastRedemption] = useState<{
    transactionHash: string;
    bondsReceived: number;
    yieldEarned: number;
  } | null>(null);

  const calculateRedemptionValue = (amount: number = 0) => {
    if (amount <= 0) return 0;
    // Simple calculation: principal + (principal * yield rate * time factor)
    const timeFactor = userData.timeLocked / 365; // annualized
    return amount + (amount * (userData.currentYieldRate / 100) * timeFactor);
  };

  const handleRedeem = async (amount: number) => {
    // In a real app, this would interact with your smart contract
    console.log(`Redeeming ${amount} MBS`);
    
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate redemption values
    const redemptionAmount = calculateRedemptionValue(amount);
    const yieldEarned = redemptionAmount - amount;
    
    // Update user data
    setUserData(prev => ({
      ...prev,
      mbsBalance: Math.max(0, prev.mbsBalance - amount),
      bondDeposit: Math.max(0, prev.bondDeposit - redemptionAmount + yieldEarned),
      accruedYield: Math.max(0, prev.accruedYield - yieldEarned)
    }));
    
    // Set last redemption for success screen
    setLastRedemption({
      transactionHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
      bondsReceived: redemptionAmount,
      yieldEarned
    });
    
    setShowSuccess(true);
    return true;
  };
  
  const handleDepositMore = () => {
    setShowSuccess(false);
  };

  const redemptionValue = calculateRedemptionValue(userData.mbsBalance);

  // Show success screen if redemption was successful
  if (showSuccess && lastRedemption) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Redemption Complete</h1>
          <p className="text-muted-foreground">
            Your MBS tokens have been successfully redeemed
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CurrentStatus
              mbsBalance={userData.mbsBalance}
              bondDeposit={userData.bondDeposit}
              accruedYield={userData.accruedYield}
              timeLocked={userData.timeLocked}
              redemptionValue={calculateRedemptionValue(userData.mbsBalance)}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <RedemptionSuccess
              transactionHash={lastRedemption.transactionHash}
              bondsReceived={lastRedemption.bondsReceived}
              yieldEarned={lastRedemption.yieldEarned}
              newMBSBalance={userData.mbsBalance}
              onDepositMore={handleDepositMore}
            />
            
            <RedemptionHistory redemptions={mockRedemptions} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Redeem MBS</h1>
        <p className="text-muted-foreground">
          Redeem your MBS tokens to claim your bonds and earned yield
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <CurrentStatus
            mbsBalance={userData.mbsBalance}
            bondDeposit={userData.bondDeposit}
            accruedYield={userData.accruedYield}
            timeLocked={userData.timeLocked}
            redemptionValue={redemptionValue}
          />
          
          <YieldBreakdown
            principal={userData.bondDeposit}
            yieldEarned={userData.accruedYield}
            daysHeld={Math.floor(userData.timeLocked)}
            annualRate={userData.currentYieldRate}
          />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-2xl font-semibold mb-6">Redeem MBS Tokens</h2>
            
            {userData.isLocked ? (
              <div className="text-center py-12">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mb-4">
                  <svg
                    className="h-6 w-6 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Redemption Locked</h3>
                <p className="text-muted-foreground mb-6">
                  Your MBS tokens are currently locked. Please wait for the lock period to end.
                </p>
                <div className="inline-flex items-center px-4 py-2 border border-yellow-200 rounded-md bg-yellow-50 text-sm font-medium text-yellow-800">
                  <Clock className="mr-2 h-4 w-4" />
                  {userData.timeLocked > 1 
                    ? `Unlocks in ${Math.ceil(userData.timeLocked)} days`
                    : `Unlocks in ${Math.ceil(userData.timeLocked * 24)} hours`
                  }
                </div>
              </div>
            ) : (
              <RedemptionForm
                maxAmount={userData.mbsBalance}
                currentYield={userData.currentYieldRate}
                onRedeem={handleRedeem}
              />
            )}
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium mb-3">How it works</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Enter the amount of MBS you want to redeem</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Review the redemption value including your earned yield</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Confirm the transaction in your wallet</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>Receive your bonds and yield directly to your wallet</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Recent Redemptions</h3>
              <RedemptionHistory 
                redemptions={mockRedemptions.slice(0, 2)} 
                className="border"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
