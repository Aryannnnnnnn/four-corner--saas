"use client";

import React, { memo, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ROIChartProps {
  data: {
    labels: string[];
    data?: number[];
    datasets?: Array<{
      data: number[];
      label?: string;
    }>;
  };
}

const ROIChart = memo(function ROIChart({ data }: ROIChartProps) {
  // Memoized chart data processing to prevent recalculation
  const chartData = useMemo(() => {
    if (!data?.labels?.length) return [];
    
    const labels = data.labels;
    const values = data.datasets?.[0]?.data || data.data || [];
    
    return labels.map((label, index) => ({
      year: label,
      roi: values[index] || 0,
      formattedROI: `${(values[index] || 0).toFixed(1)}%`,
    }));
  }, [data]);

  // Memoized gradient definitions
  const gradientDefs = useMemo(() => (
    <defs>
      <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
      </linearGradient>
      <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  ), []);

  // Custom tooltip component
  const CustomTooltip = useMemo(() => 
    ({ active, payload, label }: any) => {
      if (!active || !payload?.length) return null;
      
      const value = payload[0]?.value || 0;
      const isPositive = value >= 0;
      
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          <div className="flex items-center gap-2">
            <div 
              className={`w-3 h-3 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
            />
            <span className="text-white">
              ROI: <span className={`font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {value.toFixed(1)}%
              </span>
            </span>
          </div>
        </div>
      );
    }, []
  );

  // Return empty state if no data
  if (!data || !chartData.length) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-white/10 backdrop-blur-sm">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-white/80 font-semibold mb-2">No ROI Data Available</p>
          <p className="text-white/50 text-sm">ROI projections will appear here once analysis is complete</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] bg-gradient-to-br from-gray-900/30 to-gray-800/30 rounded-xl border border-white/10 backdrop-blur-sm p-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {gradientDefs}
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.08)" 
            vertical={false}
          />
          <XAxis
            dataKey="year"
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: "13px", fontWeight: "500" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: "13px", fontWeight: "500" }}
            tickFormatter={(value) => `${value}%`}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Tooltip content={CustomTooltip} />
          <Legend 
            wrapperStyle={{ paddingTop: "20px", color: "#fff" }}
            iconType="rect"
          />
          <Bar 
            dataKey="roi" 
            name="Return on Investment"
            radius={[4, 4, 0, 0]}
            filter="url(#glow)"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.roi >= 0 ? "url(#positiveGradient)" : "url(#negativeGradient)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default ROIChart;
