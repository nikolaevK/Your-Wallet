import React from "react";
import Categories from "./components /categories";

interface DashboardInterface {
  params: { budgetId: string };
}

export default function Dashboard({
  params: { budgetId },
}: DashboardInterface) {
  return (
    <div className="w-full pt-6 px-4">
      {/* @ts-expect-error Server Component */}
      <Categories budgetId={budgetId} />
    </div>
  );
}
