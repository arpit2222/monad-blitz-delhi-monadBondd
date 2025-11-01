"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded';

interface Payment {
  id: string;
  date: Date;
  type: 'monitoring' | 'arbitrage' | 'withdrawal' | 'deposit';
  amount: number;
  status: PaymentStatus;
  txHash: string;
  description: string;
}

const statusVariantMap: Record<PaymentStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  completed: 'default',
  pending: 'secondary',
  failed: 'destructive',
  refunded: 'outline',
};

const typeLabelMap: Record<Payment['type'], string> = {
  monitoring: 'Monitoring',
  arbitrage: 'Arbitrage',
  withdrawal: 'Withdrawal',
  deposit: 'Deposit',
};

// Mock data - in a real app, this would come from an API
const mockPayments: Payment[] = [
  {
    id: 'tx_001',
    date: new Date('2023-10-25T14:32:15'),
    type: 'monitoring',
    amount: 1.25,
    status: 'completed',
    txHash: '0x1234...abcd',
    description: '1000 price checks',
  },
  {
    id: 'tx_002',
    date: new Date('2023-10-24T09:15:42'),
    type: 'arbitrage',
    amount: 0.42,
    status: 'completed',
    txHash: '0x5678...ef01',
    description: '42 arbitrage executions',
  },
  {
    id: 'tx_003',
    date: new Date('2023-10-23T16:45:30'),
    type: 'withdrawal',
    amount: 50.0,
    status: 'pending',
    txHash: '0x9abc...2345',
    description: 'Withdrawal to wallet',
  },
  {
    id: 'tx_004',
    date: new Date('2023-10-20T11:20:15'),
    type: 'deposit',
    amount: 100.0,
    status: 'completed',
    txHash: '0xdef0...6789',
    description: 'Initial deposit',
  },
  {
    id: 'tx_005',
    date: new Date('2023-10-18T13:10:05'),
    type: 'monitoring',
    amount: 0.75,
    status: 'refunded',
    txHash: '0x1357...9bdf',
    description: 'Refund for service interruption',
  },
];

export function X402History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus[]>([]);
  const [typeFilter, setTypeFilter] = useState<Payment['type'][]>([]);

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = 
      payment.id.includes(searchTerm) ||
      payment.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(payment.status);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(payment.type);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const toggleStatusFilter = (status: PaymentStatus) => {
    setStatusFilter(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const toggleTypeFilter = (type: Payment['type']) => {
    setTypeFilter(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const exportToCSV = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting to CSV...');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Payment History</CardTitle>
            <p className="text-sm text-muted-foreground">
              Track all your x402 payment transactions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(statusFilter.length + typeFilter.length > 0) && (
                  <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {statusFilter.length + typeFilter.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="px-2 py-1.5 text-sm font-medium">Status</div>
              {(['completed', 'pending', 'failed', 'refunded'] as const).map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={() => toggleStatusFilter(status)}
                >
                  <span className="capitalize">{status}</span>
                </DropdownMenuCheckboxItem>
              ))}
              <div className="px-2 py-1.5 text-sm font-medium mt-2">Type</div>
              {(['monitoring', 'arbitrage', 'withdrawal', 'deposit'] as const).map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={typeFilter.includes(type)}
                  onCheckedChange={() => toggleTypeFilter(type)}
                >
                  {typeLabelMap[type]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      <div className="text-sm">{formatDate(payment.date)}</div>
                      <div className="text-xs text-muted-foreground">#{payment.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {typeLabelMap[payment.type]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>{payment.description}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {payment.txHash}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {payment.amount >= 0 ? '+' : ''}{payment.amount.toFixed(2)} MBS
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariantMap[payment.status]} className="capitalize">
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View receipt</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between px-2 py-4 text-sm text-muted-foreground">
          <div>Showing {filteredPayments.length} of {mockPayments.length} transactions</div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
