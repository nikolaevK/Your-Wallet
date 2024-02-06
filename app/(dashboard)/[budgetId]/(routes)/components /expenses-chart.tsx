"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ExpensesChart {
  data: Record<number, { name: string; amount: number }>[];
  currency: string;
}
type Dimensions = { width: number; height: number };

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function ExpensesChart({ data, currency }: ExpensesChart) {
  const [windowDimensions, setWindowDimensions] = useState<Dimensions>();

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {windowDimensions && (
          <>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={windowDimensions.width < 500 ? 8 : 10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={windowDimensions.width < 500 ? 8 : 10}
              tickFormatter={(value) => `${currency}${value}`}
            />
          </>
        )}

        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#16a34a"
          fill="#d0ecda"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
