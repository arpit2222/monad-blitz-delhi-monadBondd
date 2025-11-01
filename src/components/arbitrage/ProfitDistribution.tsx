"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ProfitItem = {
  id: string;
  label: string;
  value: number;
  color: string;
  description?: string;
};

interface ProfitDistributionProps {
  totalProfit: number;
  items: ProfitItem[];
  className?: string;
}

export function ProfitDistribution({ 
  totalProfit,
  items,
  className = '' 
}: ProfitDistributionProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Calculate percentages and degrees for the pie chart
  const calculatePercentage = (value: number) => (value / totalProfit) * 100;
  
  // Generate SVG path data for the pie chart segments
  const getPathData = (start: number, percent: number) => {
    const x1 = 50 + 40 * Math.cos(2 * Math.PI * start);
    const y1 = 50 + 40 * Math.sin(2 * Math.PI * start);
    const x2 = 50 + 40 * Math.cos(2 * Math.PI * (start + percent));
    const y2 = 50 + 40 * Math.sin(2 * Math.PI * (start + percent));
    const largeArcFlag = percent > 0.5 ? 1 : 0;
    
    return `M50,50 L${x1},${y1} A40,40 0 ${largeArcFlag},1 ${x2},${y2} Z`;
  };
  
  // Calculate the paths for each segment
  let currentPercent = 0;
  const segments = items.map((item) => {
    const percent = item.value / totalProfit;
    const pathData = getPathData(currentPercent, percent);
    const startAngle = currentPercent * 360;
    const endAngle = (currentPercent + percent) * 360;
    const midAngle = (startAngle + endAngle) / 2;
    const textX = 50 + 25 * Math.cos((midAngle * Math.PI) / 180);
    const textY = 50 + 25 * Math.sin((midAngle * Math.PI) / 180);
    
    currentPercent += percent;
    
    return {
      ...item,
      pathData,
      textX,
      textY,
      percent: percent * 100,
      midAngle,
    };
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Profit Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Pie Chart */}
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {segments.map((segment) => {
                const isHovered = hoveredItem === segment.id || hoveredItem === null;
                return (
                  <TooltipProvider key={segment.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <g 
                          onMouseEnter={() => setHoveredItem(segment.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="cursor-pointer transition-opacity"
                          style={{
                            opacity: isHovered ? 1 : 0.7,
                            filter: isHovered ? 'drop-shadow(0 0 2px rgba(0,0,0,0.3))' : 'none',
                          }}
                        >
                          <path
                            d={segment.pathData}
                            fill={segment.color}
                            stroke="#fff"
                            strokeWidth="0.5"
                            className="transition-transform hover:scale-105"
                            style={{
                              transformOrigin: 'center',
                              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            }}
                          />
                          {segment.percent > 10 && (
                            <text
                              x={segment.textX}
                              y={segment.textY}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                              fontSize="4"
                              fontWeight="bold"
                              className="pointer-events-none"
                            >
                              {Math.round(segment.percent)}%
                            </text>
                          )}
                        </g>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: segment.color }}
                            />
                            <span className="font-medium">{segment.label}</span>
                          </div>
                          <div className="text-sm">
                            ${segment.value.toFixed(2)} ({segment.percent.toFixed(1)}%)
                          </div>
                          {segment.description && (
                            <div className="text-xs text-muted-foreground">
                              {segment.description}
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
              <circle cx="50" cy="50" r="30" fill="#f8fafc" />
              <text
                x="50"
                y="45"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-bold"
                fill="#64748b"
              >
                Total Profit
              </text>
              <text
                x="50"
                y="58"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-bold"
                fill="#0f172a"
              >
                ${totalProfit.toFixed(2)}
              </text>
            </svg>
          </div>
          
          {/* Legend */}
          <div className="w-full md:w-auto space-y-3">
            <div className="grid grid-cols-1 gap-2">
              {segments.map((segment) => (
                <div 
                  key={segment.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredItem(segment.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    backgroundColor: hoveredItem === segment.id ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                  }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ 
                        backgroundColor: segment.color,
                        opacity: hoveredItem === null || hoveredItem === segment.id ? 1 : 0.6,
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium">{segment.label}</div>
                      {segment.description && (
                        <div className="text-xs text-muted-foreground">
                          {segment.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    ${segment.value.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 mt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Profit</span>
                <span className="font-medium">${totalProfit.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Default export with sample data for easy usage
export function DefaultProfitDistribution() {
  const sampleData = {
    totalProfit: 60,
    items: [
      {
        id: 'eth-arb',
        label: 'ETH Arbitrage',
        value: 25.5,
        color: '#6366f1', // indigo-500
        description: 'Ethereum price difference',
      },
      {
        id: 'stable-arb',
        label: 'Stablecoin Arbitrage',
        value: 18.2,
        color: '#10b981', // emerald-500
        description: 'USDC/DAI price difference',
      },
      {
        id: 'yield-farming',
        label: 'Yield Farming',
        value: 10.8,
        color: '#f59e0b', // amber-500
        description: 'Liquidity pool rewards',
      },
      {
        id: 'gas-rebate',
        label: 'Gas Rebate',
        value: 5.5,
        color: '#8b5cf6', // violet-500
        description: 'MEV protection rebate',
      },
    ],
  };

  return <ProfitDistribution {...sampleData} />;
}
