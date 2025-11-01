import { CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TransactionResult = {
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  executionTime: number;
  amountBought: number;
  buyPrice: number;
  amountSold: number;
  sellPrice: number;
  totalProfit: number;
  mevExtracted: number;
  transactionHash: string;
  timestamp: number;
};

type ResultsDisplayProps = {
  result: TransactionResult | null;
  onCopyHash: (hash: string) => void;
  explorerUrl: string;
};

export function ResultsDisplay({ result, onCopyHash, explorerUrl }: ResultsDisplayProps) {
  if (!result) return null;

  const statusColor = result.status === 'COMPLETED' ? 'text-green-500' : 
                     result.status === 'FAILED' ? 'text-red-500' : 'text-yellow-500';

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Transaction Results</h3>
        <div className={`flex items-center ${statusColor}`}>
          {result.status === 'COMPLETED' && <CheckCircle2 className="mr-1 h-4 w-4" />}
          <span className="font-medium">{result.status}</span>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Execution time:</span>
          <span>{result.executionTime.toFixed(2)}s</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount bought:</span>
          <span>{result.amountBought} bonds @ ${result.buyPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount sold:</span>
          <span>{result.amountSold} bonds @ ${result.sellPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between font-medium">
          <span>Total profit:</span>
          <span className="text-green-500">${result.totalProfit.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">MEV extraction:</span>
          <div className="flex items-center">
            <span>${result.mevExtracted.toFixed(2)}</span>
            {result.mevExtracted === 0 && (
              <span className="ml-1 text-green-500">(Protected)</span>
            )}
            <CheckCircle2 className="ml-1 h-4 w-4 text-green-500" />
          </div>
        </div>
        
        {result.transactionHash && (
          <div className="pt-2">
            <div className="flex items-center justify-between rounded-md bg-muted p-2">
              <div className="flex items-center space-x-2 overflow-hidden">
                <a
                  href={`${explorerUrl}/tx/${result.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-500 hover:underline"
                >
                  {`${result.transactionHash.slice(0, 6)}...${result.transactionHash.slice(-4)}`}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onCopyHash(result.transactionHash)}
                title="Copy transaction hash"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
