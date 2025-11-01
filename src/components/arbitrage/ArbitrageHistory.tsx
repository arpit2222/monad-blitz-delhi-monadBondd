"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableCaption 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowUpDown, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { 
  filterArbitrageHistory, 
  sortArbitrageHistory, 
  formatDate, 
  formatCurrency, 
  formatTime, 
  getStatusBadgeClass 
} from '@/lib/utils/arbitrage';
import { ArbitrageTransaction, ArbitrageHistoryFilters } from '@/types/arbitrage';

interface ArbitrageHistoryProps {
  data: ArbitrageTransaction[];
  onRowClick?: (id: string) => void;
  className?: string;
}

export function ArbitrageHistory({ data, onRowClick, className = '' }: ArbitrageHistoryProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<ArbitrageHistoryFilters>({
    sortBy: 'date',
    sortOrder: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [minProfit, setMinProfit] = useState<string>('');
  const [maxProfit, setMaxProfit] = useState<string>('');

  // Apply filters and sorting
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Apply filters
    const filterOptions: ArbitrageHistoryFilters = {
      ...filters,
      status: statusFilter === 'all' ? undefined : statusFilter as any,
      startDate: dateRange?.from,
      endDate: dateRange?.to,
      minProfit: minProfit ? Number(minProfit) : undefined,
      maxProfit: maxProfit ? Number(maxProfit) : undefined,
    };
    
    result = filterArbitrageHistory(result, filterOptions);
    
    // Apply sorting
    result = sortArbitrageHistory(result, filters.sortBy, filters.sortOrder);
    
    return result;
  }, [data, filters, statusFilter, dateRange, minProfit, maxProfit]);

  const handleSort = (field: 'date' | 'profit' | 'executionTime') => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: 
        prev.sortBy === field && prev.sortOrder === 'desc' 
          ? 'asc' 
          : 'desc'
    }));
  };

  const resetFilters = () => {
    setFilters({
      sortBy: 'date',
      sortOrder: 'desc',
    });
    setStatusFilter('all');
    setDateRange(undefined);
    setMinProfit('');
    setMaxProfit('');
  };

  const hasActiveFilters = 
    statusFilter !== 'all' || 
    dateRange?.from || 
    dateRange?.to || 
    minProfit || 
    maxProfit;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Arbitrage History</CardTitle>
          <CardDescription>
            {filteredData.length} transaction{filteredData.length !== 1 ? 's' : ''} found
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant={showFilters ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="h-2 w-2 rounded-full bg-primary"></span>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {showFilters && (
          <div className="mb-6 p-4 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="reverted">Reverted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'MMM d, yyyy')} -{' '}
                            {format(dateRange.to, 'MMM d, yyyy')}
                          </>
                        ) : (
                          format(dateRange.from, 'MMM d, yyyy')
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Min Profit (USDC)</label>
                <Input 
                  type="number" 
                  placeholder="0" 
                  value={minProfit}
                  onChange={(e) => setMinProfit(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Profit (USDC)</label>
                <Input 
                  type="number" 
                  placeholder="No limit" 
                  value={maxProfit}
                  onChange={(e) => setMaxProfit(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Reset filters
              </Button>
            </div>
          </div>
        )}
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    <span>Date/Time</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>From/To</TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('profit')}
                >
                  <div className="flex items-center justify-end">
                    <span>Profit</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('executionTime')}
                >
                  <div className="flex items-center justify-end">
                    <span>Time</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => onRowClick ? onRowClick(item.id) : router.push(`/arbitrage/${item.id}`)}
                  >
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(item.timestamp)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{item.fromMarket}</div>
                        <div className="text-muted-foreground text-xs">
                          → {item.toMarket}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium text-green-600">
                        {formatCurrency(item.profit)}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {item.profitPercentage.toFixed(2)}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatTime(item.executionTime)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant="outline" 
                        className={getStatusBadgeClass(item.status)}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
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
      </CardContent>
    </Card>
  );
}
