import prismadb from "@/lib/prismadb";
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
  // Extract currency information
  const budget = await prismadb.budget.findFirst({
    where: {
      id: budgetId,
    },
  });

  const currency = await prismadb.currency.findFirst({
    where: {
      id: budget?.currencyId,
    },
  });

  return (
    <section className="w-full pt-6 px-4 mt-14 md:mt-0">
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 mb-4">
        {/* @ts-expect-error Server Component */}
        <OverviewCard budgetId={budgetId} currency={currency} />
        {/* @ts-expect-error Server Component */}
        <RecentExpensesCard budgetId={budgetId} currency={currency} />
      </div>
      {/* @ts-expect-error Server Component */}
      <Categories budgetId={budgetId} />
    </section>
  );
}
