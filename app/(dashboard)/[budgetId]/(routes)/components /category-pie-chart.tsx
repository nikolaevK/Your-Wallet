"use client";

import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(142.1 76.2% 36.3%)", "hsl(240 4.8% 95.9%)"];

interface CategoryPieChartInterface {
  data: Array<Record<number, { name: string; value: number }>>;
}

export default function CategoryPieChart({ data }: CategoryPieChartInterface) {
  return (
    <PieChart id="test" width={120} height={120}>
      <Pie
        data={data}
        outerRadius={50}
        dataKey="value"
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
