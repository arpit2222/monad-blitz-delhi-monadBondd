import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Shield, Zap, ArrowRight, Check, X } from 'lucide-react';

type Step = {
  id: number;
  ethereum: {
    title: string;
    description: string;
    status: 'bad' | 'neutral' | 'good';
    icon: React.ReactNode;
  };
  monad: {
    title: string;
    description: string;
    status: 'bad' | 'neutral' | 'good';
    icon: React.ReactNode;
  };
};

const steps: Step[] = [
  {
    id: 1,
    ethereum: {
      title: 'Transaction Submitted',
      description: 'Transaction enters mempool',
      status: 'neutral',
      icon: <ArrowRight className="h-4 w-4" />,
    },
    monad: {
      title: 'Transaction Submitted',
      description: 'Transaction enters mempool',
      status: 'neutral',
      icon: <ArrowRight className="h-4 w-4" />,
    },
  },
  {
    id: 2,
    ethereum: {
      title: 'MEV Detection',
      description: 'Bots detect profitable arbitrage opportunity',
      status: 'bad',
      icon: <AlertCircle className="h-4 w-4 text-red-500" />,
    },
    monad: {
      title: 'Parallel Processing',
      description: 'Transactions processed in parallel',
      status: 'good',
      icon: <Zap className="h-4 w-4 text-green-500" />,
    },
  },
  {
    id: 3,
    ethereum: {
      title: 'Front-Running',
      description: 'Bots submit higher gas transactions',
      status: 'bad',
      icon: <X className="h-4 w-4 text-red-500" />,
    },
    monad: {
      title: 'MEV Resistance',
      description: 'Deterministic execution prevents front-running',
      status: 'good',
      icon: <Shield className="h-4 w-4 text-green-500" />,
    },
  },
  {
    id: 4,
    ethereum: {
      title: 'Result',
      description: 'Up to 90% of profits extracted by MEV',
      status: 'bad',
      icon: <X className="h-4 w-4 text-red-500" />,
    },
    monad: {
      title: 'Result',
      description: '100% of profits go to you',
      status: 'good',
      icon: <Check className="h-4 w-4 text-green-500" />,
    },
  },
];

export function MEVComparison() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          MEV Protection Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Ethereum Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-medium text-[#627EEA]">Ethereum</h3>
              <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                Vulnerable to MEV
              </div>
            </div>
            
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={`ethereum-${step.id}`} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${
                      step.ethereum.status === 'bad' ? 'bg-red-100 text-red-500' :
                      step.ethereum.status === 'good' ? 'bg-green-100 text-green-500' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {step.ethereum.icon}
                    </div>
                    <h4 className="font-medium">{step.ethereum.title}</h4>
                  </div>
                  <p className="pl-8 text-sm text-muted-foreground">
                    {step.ethereum.description}
                  </p>
                  {step.id < steps.length && (
                    <div className="h-6 w-0.5 bg-gray-200 ml-3.5 my-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Monad Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-medium text-[#00FF9C]">Monad</h3>
              <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                MEV Protected
              </div>
            </div>
            
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={`monad-${step.id}`} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${
                      step.monad.status === 'bad' ? 'bg-red-100 text-red-500' :
                      step.monad.status === 'good' ? 'bg-green-100 text-green-500' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {step.monad.icon}
                    </div>
                    <h4 className="font-medium">{step.monad.title}</h4>
                  </div>
                  <p className="pl-8 text-sm text-muted-foreground">
                    {step.monad.description}
                  </p>
                  {step.id < steps.length && (
                    <div className="h-6 w-0.5 bg-gray-200 ml-3.5 my-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Educational Section */}
        <div className="mt-12 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
            <Zap className="h-5 w-5 text-blue-500" />
            How Monad Prevents MEV
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium">Parallel Execution</h4>
              <p className="text-sm text-muted-foreground">
                Monad's parallel processing of transactions eliminates the advantage that MEV bots have in traditional blockchains by processing transactions in batches rather than sequentially.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Deterministic Finality</h4>
              <p className="text-sm text-muted-foreground">
                Transactions are finalized in a deterministic order, preventing front-running and other MEV extraction techniques that rely on transaction ordering.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
