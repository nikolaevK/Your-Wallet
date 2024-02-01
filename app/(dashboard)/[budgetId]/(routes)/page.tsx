import React from "react";
import Categories from "./components /categories";
import OverviewCard from "./components /overview-card";
import RecentExpensesCard from "./components /recent-expenses-card";

interface DashboardInterface {
  params: { budgetId: string };
}

export default async function Dashboard({
  params: { budgetId },
}: DashboardInterface) {
  return (
    <section className="w-full pt-6 px-4 mt-14 md:mt-0">
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
        {/* @ts-expect-error Server Component */}
        <OverviewCard budgetId={budgetId} />
        <RecentExpensesCard />
      </div>
      {/* @ts-expect-error Server Component */}
      <Categories budgetId={budgetId} />
    </section>
  );
}
