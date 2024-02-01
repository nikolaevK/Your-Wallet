"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useState, useEffect, Suspense } from "react";

interface OverviewInterface {
  data: Record<number, { name: string; total: number }>[];
  currency: string;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

type Dimensions = { width: number; height: number };

export default function Overview({ data, currency }: OverviewInterface) {
  const [windowDimensions, setWindowDimensions] = useState<Dimensions>();

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  return windowDimensions ? (
    <ResponsiveContainer
      width={windowDimensions.width < 500 ? "100%" : "100%"}
      height={windowDimensions.height < 700 ? 250 : 350}
    >
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={windowDimensions.width < 500 ? 8 : 10}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={windowDimensions.width < 500 ? 8 : 10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${currency}${value}`}
        />
        <Bar dataKey="total" fill="#16a34a" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <></>
  );
}
