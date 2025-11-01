"use client";

import { useState } from 'react';
import { BondTypeSelector } from '@/components/deposit/BondTypeSelector';
import { BondDepositForm } from '@/components/deposit/BondDepositForm';
import { YieldCalculator } from '@/components/deposit/YieldCalculator';
import { DepositSuccess } from '@/components/deposit/DepositSuccess';
import { BondStatusDisplay } from '@/components/deposit/BondStatusDisplay';

export default function DepositPage() {
  const [selectedBond, setSelectedBond] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Mock data - in a real app, this would come from your smart contract or API
  const [userData, setUserData] = useState({
    mbsBalance: 1250,
    bondsLocked: 1000,
    totalYieldEarned: 42.50,
  });

  const handleSelectBond = (bondType: string) => {
    setSelectedBond(bondType);
  };

  const handleDeposit = async (depositAmount: number) => {
    // In a real app, this would interact with your smart contract
    console.log(`Depositing ${depositAmount} of bond type ${selectedBond}`);
    
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a mock transaction hash
    const mockHash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    
    setTransactionHash(mockHash);
    setAmount(depositAmount);
    
    // Update user data
    setUserData(prev => ({
      ...prev,
      mbsBalance: prev.mbsBalance + depositAmount,
      bondsLocked: prev.bondsLocked + depositAmount,
    }));
    
    // Show success screen
    setIsSuccess(true);
  };

  if (isSuccess && amount !== null) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bond Deposit</h1>
          <p className="text-muted-foreground">Deposit bonds to earn yield in MBS tokens</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DepositSuccess
              transactionHash={transactionHash}
              mbsReceived={amount}
              bondType={selectedBond}
              currentBalance={userData.mbsBalance}
            />
          </div>
          <div>
            <BondStatusDisplay
              mbsBalance={userData.mbsBalance}
              bondsLocked={userData.bondsLocked}
              totalYieldEarned={userData.totalYieldEarned}
              bondType={selectedBond}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bond Deposit</h1>
        <p className="text-muted-foreground">Deposit bonds to earn yield in MBS tokens</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <BondTypeSelector onSelect={handleSelectBond} />
          
          {selectedBond && (
            <>
              <BondDepositForm 
                bondType={selectedBond} 
                onDeposit={handleDeposit} 
              />
              
              {amount && (
                <YieldCalculator 
                  bondType={selectedBond} 
                  amount={amount}
                  bondYield={4.2} // This would come from your bond data
                />
              )}
            </>
          )}
        </div>
        
        <div>
          <BondStatusDisplay
            mbsBalance={userData.mbsBalance}
            bondsLocked={userData.bondsLocked}
            totalYieldEarned={userData.totalYieldEarned}
          />
        </div>
      </div>
    </div>
  );
}
