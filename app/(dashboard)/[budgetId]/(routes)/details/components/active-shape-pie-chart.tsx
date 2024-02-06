"use client";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

interface ActiveShapePieChartInterface {
  data: Record<number, { categoryName: string; value: number }>[];
  totalWeeklyExpense: number;
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

export default function ActiveShapePieChart({
  data,
  totalWeeklyExpense,
  currency,
}: ActiveShapePieChartInterface) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState<Dimensions>();

  function onPieEnter(_: any, index: number) {
    setActiveIndex(index);
  }

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  return windowDimensions ? (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props: any) =>
            renderActiveShape(
              props,
              formatCurrency(totalWeeklyExpense, currency)
            )
          }
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={windowDimensions.height < 700 ? 40 : 60}
          outerRadius={windowDimensions.width < 500 ? 60 : 80}
          fill="hsl(142.1 76.2% 36.3%)"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onTouchStart={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <></>
  );
}

const renderActiveShape = (props: any, totalWeeklyExpense: string) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    categoryName,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 1;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-[8px] md:text-sm"
      >
        {totalWeeklyExpense}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        className="text-[8px] md:text-[12px]"
        dy={-12}
      >{`${categoryName}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        className="text-[8px] md:text-[12px]"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={12}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={8}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
