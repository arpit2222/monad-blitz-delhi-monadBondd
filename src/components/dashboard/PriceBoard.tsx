import { ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type MarketData = {
  name: string;
  price: number;
  liquidity: string;
};

type PriceBoardProps = {
  marketA: MarketData;
  marketB: MarketData;
  spread: number;
  profitPerBond: number;
  status: 'EXECUTABLE' | 'UNAVAILABLE';
};

export function PriceBoard({
  marketA,
  marketB,
  spread,
  profitPerBond,
  status,
}: PriceBoardProps) {
  const isProfitable = spread > 0;
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Arbitrage Opportunity</CardTitle>
        <Badge 
          variant={status === 'EXECUTABLE' ? 'default' : 'secondary'}
          className={status === 'EXECUTABLE' ? 'bg-green-500 hover:bg-green-600' : ''}
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <MarketCard 
            name={marketA.name} 
            price={marketA.price} 
            liquidity={marketA.liquidity} 
          />
          <MarketCard 
            name={marketB.name} 
            price={marketB.price} 
            liquidity={marketB.liquidity}
            isHigher={marketB.price > marketA.price}
          />
        </div>
        
        <div className="mt-6 flex items-center justify-between rounded-lg bg-muted p-4">
          <div>
            <p className="text-sm text-muted-foreground">Spread</p>
            <p className={`text-2xl font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
              {isProfitable ? '+' : ''}{spread}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Profit per bond</p>
            <p className="text-2xl font-bold text-green-500">${profitPerBond.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type MarketCardProps = MarketData & {
  isHigher?: boolean;
};

function MarketCard({ name, price, liquidity, isHigher = false }: MarketCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{name}</h3>
        {isHigher && <ArrowUp className="h-4 w-4 text-green-500" />}
      </div>
      <p className="mt-2 text-2xl font-bold">${price.toFixed(2)}</p>
      <p className="text-sm text-muted-foreground">Liquidity: {liquidity}</p>
    </div>
  );
}
