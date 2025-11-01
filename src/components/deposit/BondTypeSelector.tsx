"use client";

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BOND_TYPES = [
  { id: 'gov-10y', name: '10-Year Government Bond', yield: 4.2, duration: '10 years' },
  { id: 'corp-a', name: 'Corporate Bond A', yield: 5.1, duration: '5 years' },
  { id: 'treasury', name: 'Treasury Bond', yield: 3.8, duration: '30 years' },
  { id: 'municipal', name: 'Municipal Bond', yield: 4.5, duration: '15 years' },
];

interface BondTypeSelectorProps {
  onSelect: (bondType: string) => void;
}

export function BondTypeSelector({ onSelect }: BondTypeSelectorProps) {
  const [selectedBond, setSelectedBond] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedBond(value);
    onSelect(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Bond Type</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={handleSelect} value={selectedBond}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a bond type" />
          </SelectTrigger>
          <SelectContent>
            {BOND_TYPES.map((bond) => (
              <SelectItem key={bond.id} value={bond.id}>
                <div className="flex justify-between w-full">
                  <span>{bond.name}</span>
                  <span className="text-muted-foreground">{bond.yield}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Duration: {bond.duration}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
