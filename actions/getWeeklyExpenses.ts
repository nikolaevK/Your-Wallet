"use server";

import prismadb from "@/lib/prismadb";
import { endOfWeek, startOfWeek } from "date-fns";

export async function getWeeklyExpenses(budgetId: string) {
  if (!budgetId) throw new Error("budgetId is required");

  const expenses = await prismadb.expense.findMany({
    where: {
      budgetId,
      amount: {
        lt: 0,
      },

      createdAt: {
        gte: startOfWeek(new Date()),
        lte: endOfWeek(new Date()),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return expenses;
}
