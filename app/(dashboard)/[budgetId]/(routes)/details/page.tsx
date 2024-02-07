import { getCurrency } from "@/actions/getCurrency";
import prismadb from "@/lib/prismadb";
import React from "react";
import DetailsTabs from "./components/details-tabs";
import MonthlySpendInCategory from "./components/monthly-spend-in-category";

interface DetailsInterface {
  params: { budgetId: string };
}

export default async function Details({
  params: { budgetId },
}: DetailsInterface) {
  const currency = await getCurrency(budgetId);

  return (
    <section className="pt-6 px-4 mt-14 mb-20 md:mt-0">
      {/* @ts-expect-error Server Component */}
      <MonthlySpendInCategory budgetId={budgetId} currency={currency} />
      {/* @ts-expect-error Server Component */}
      <DetailsTabs budgetId={budgetId} currency={currency} />
    </section>
  );
}
