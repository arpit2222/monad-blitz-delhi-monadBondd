"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Clock, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExecutionTimeline } from './ExecutionTimeline';
import { DefaultProfitDistribution } from './ProfitDistribution';
import { 
  formatDate, 
  formatCurrency, 
  formatTime, 
  getStatusBadgeClass 
} from '@/lib/utils/arbitrage';
import { ArbitrageTransaction } from '@/types/arbitrage';

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
  isLink?: boolean;
  href?: string;
}

const DetailRow = ({ label, value, highlight = false, isLink = false, href }: DetailRowProps) => {
  const content = (
    <div className={`flex justify-between py-2 ${highlight ? 'font-medium' : ''}`}>
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center">
        {value}
        {isLink && <ExternalLink className="ml-2 h-3 w-3" />}
      </div>
    </div>
  );

  if (isLink && href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:bg-muted/50 block -mx-4 px-4 rounded-md transition-colors"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
};

interface ArbitrageDetailsProps {
  data: ArbitrageTransaction;
  onBack?: () => void;
}

export function ArbitrageDetails({ data, onBack }: ArbitrageDetailsProps) {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/arbitrage');
    }
  };

  const etherscanUrl = `https://etherscan.io/tx/${data.transactionHash}`;
  
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="pl-0"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to History
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Arbitrage Details</CardTitle>
              <div className="flex items-center mt-2">
                <span className="text-muted-foreground mr-2">Transaction ID:</span>
                <span className="font-mono">{data.id}</span>
              </div>
            </div>
            <Badge 
              className={`px-3 py-1.5 text-sm ${getStatusBadgeClass(data.status)}`}
            >
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="execution">
                <Clock className="h-4 w-4 mr-2" />
                Execution
              </TabsTrigger>
              <TabsTrigger value="profit">
                <PieChart className="h-4 w-4 mr-2" />
                Profit
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Transaction Overview</h3>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <DetailRow 
                    label="Timestamp" 
                    value={formatDate(data.timestamp)} 
                  />
                  <DetailRow 
                    label="Transaction Hash" 
                    value={
                      <span className="font-mono">
                        {`${data.transactionHash.slice(0, 8)}...${data.transactionHash.slice(-6)}`}
                      </span>
                    }
                    isLink
                    href={etherscanUrl}
                  />
                  <DetailRow 
                    label="Block Number" 
                    value={data.blockNumber.toLocaleString()}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Arbitrage Details</h3>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">From</p>
                      <p className="text-sm text-muted-foreground">{data.fromMarket}</p>
                    </div>
                    <div className="text-muted-foreground">→</div>
                    <div className="space-y-1 text-right">
                      <p className="text-sm font-medium">To</p>
                      <p className="text-sm text-muted-foreground">{data.toMarket}</p>
                    </div>
                  </div>
                  
                  <DetailRow 
                    label="USDC In" 
                    value={formatCurrency(data.usdcIn)}
                  />
                  <DetailRow 
                    label="Bonds Received" 
                    value={data.bondsReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  />
                  <DetailRow 
                    label="USDC Out" 
                    value={formatCurrency(data.usdcOut)}
                  />
                  <DetailRow 
                    label="Profit" 
                    value={
                      <span className="text-green-600">
                        {formatCurrency(data.profit)} ({data.profitPercentage.toFixed(2)}%)
                      </span>
                    }
                    highlight
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Execution Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <DetailRow 
                      label="Execution Time" 
                      value={formatTime(data.executionTime)}
                    />
                    <DetailRow 
                      label="Gas Used" 
                      value={data.gasUsed.toLocaleString()}
                    />
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <DetailRow 
                      label="Status" 
                      value={
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(data.status)}`}>
                          {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                        </span>
                      }
                    />
                    <DetailRow 
                      label="View on Etherscan" 
                      value=""
                      isLink
                      href={etherscanUrl}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="mr-2"
                >
                  Back to History
                </Button>
                <Button asChild>
                  <a 
                    href={etherscanUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    View on Etherscan
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="execution">
              <div className="space-y-4">
                <h3 className="font-medium">Execution Timeline</h3>
                <ExecutionTimeline 
                  executionTime={data.executionTime || 0.18} 
                  ethereumExecutionTime={4.5} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="profit">
              <div className="space-y-4">
                <h3 className="font-medium">Profit Distribution</h3>
                <DefaultProfitDistribution />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
