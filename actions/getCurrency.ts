"use server";

import prismadb from "@/lib/prismadb";

export async function getCurrency(budgetId: string) {
  if (!budgetId) throw new Error("budgetId is required");

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
  return currency;
}
