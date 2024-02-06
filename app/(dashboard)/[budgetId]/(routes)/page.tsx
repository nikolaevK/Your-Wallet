import { getCurrency } from "@/actions/getCurrency";
import prismadb from "@/lib/prismadb";
import React from "react";
import Categories from "./components /categories";
import MonthlyLimitCard from "./components /monthly-limit-card";
import OverviewCard from "./components /overview-card";
import RecentExpensesCard from "./components /recent-expenses-card";
import SavingsCard from "./components /savings-card";
import WeeklyExpensesChart from "./components /weekly-expenses-chart";

interface DashboardInterface {
  params: { budgetId: string };
}

export default async function Dashboard({
  params: { budgetId },
}: DashboardInterface) {
  const currency = await getCurrency(budgetId);

  return (
    <section className="w-full pt-6 px-4 mt-14 mb-20 md:mt-0">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 mb-4">
        <div className="flex flex-col justify-between items-center md:mt-0">
          {/* @ts-expect-error Server Component */}
          <SavingsCard budgetId={budgetId} currency={currency} />
          {/* @ts-expect-error Server Component */}
          <MonthlyLimitCard budgetId={budgetId} currency={currency} />
        </div>
        {/* @ts-expect-error Server Component */}
        <WeeklyExpensesChart budgetId={budgetId} currency={currency} />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 mb-4">
        {/* @ts-expect-error Server Component */}
        <OverviewCard budgetId={budgetId} currency={currency} />
        {/* @ts-expect-error Server Component */}
        <RecentExpensesCard budgetId={budgetId} currency={currency} />
      </div>
      {/* @ts-expect-error Server Component */}
      <Categories budgetId={budgetId} currency={currency} />
    </section>
  );
}
