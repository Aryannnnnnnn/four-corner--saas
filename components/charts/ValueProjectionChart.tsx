"use client";

import React, { memo, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatPrice } from "@/app/lib/utils/format";

interface ValueProjectionChartProps {
  data: {
    labels: string[];
    data?: number[];
    datasets?: Array<{
      data: number[];
      label?: string;
    }>;
  };
}

const ValueProjectionChart = memo(function ValueProjectionChart({
  data,
}: ValueProjectionChartProps) {
  // Memoized chart data processing
  const chartData = useMemo(() => {
    if (!data?.labels?.length) return [];

    const labels = data.labels;
    const values = data.datasets?.[0]?.data || data.data || [];

    return labels.map((label, index) => ({
      year: label,
      value: values[index] || 0,
      formattedValue: formatPrice(values[index] || 0),
    }));
  }, [data]);

  // Memoized gradient definitions
  const gradientDefs = useMemo(
    () => (
      <defs>
        <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
          <stop offset="50%" stopColor="#1d4ed8" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#1e40af" stopOpacity={0.1} />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <filter id="dropShadow">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#3b82f6"
            floodOpacity="0.3"
          />
        </filter>
      </defs>
    ),
    [],
  );

  // Custom tooltip
  const CustomTooltip = useMemo(
    () =>
      ({ active, payload, label }: any) => {
        if (!active || !payload?.length) return null;

        const value = payload[0]?.value || 0;

        return (
          <div className="bg-gray-900/95 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 shadow-2xl">
            <p className="text-white font-semibold mb-2">{label}</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
              <span className="text-white">
                Value:{" "}
                <span className="font-bold text-blue-400">
                  {formatPrice(value)}
                </span>
              </span>
            </div>
          </div>
        );
      },
    [],
  );

  // Return empty state if no data
  if (!data || !chartData.length) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-white/10 backdrop-blur-sm">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <p className="text-white/80 font-semibold mb-2">
            No Value Projection Data
          </p>
          <p className="text-white/50 text-sm">
            Property value projections will appear here once analysis is
            complete
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[400px] bg-gradient-to-br from-gray-900/30 to-gray-800/30 rounded-xl border border-white/10 backdrop-blur-sm p-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
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
            tickFormatter={(value) => formatPrice(value)}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Tooltip content={CustomTooltip} />
          <Legend
            wrapperStyle={{ paddingTop: "20px", color: "#fff" }}
            iconType="line"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            fill="url(#valueGradient)"
            name="Property Value Projection"
            filter="url(#dropShadow)"
            dot={{
              fill: "#3b82f6",
              strokeWidth: 3,
              r: 5,
              filter: "url(#dropShadow)",
            }}
            activeDot={{
              r: 8,
              stroke: "#60a5fa",
              strokeWidth: 3,
              fill: "#3b82f6",
              filter: "url(#dropShadow)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

export default ValueProjectionChart;
