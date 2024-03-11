"use server";

import prismadb from "@/lib/prismadb";
import { endOfWeek, startOfWeek, subHours } from "date-fns";

export async function getWeeklyExpenses(budgetId: string) {
  if (!budgetId) throw new Error("budgetId is required");

  const expenses = await prismadb.expense.findMany({
    where: {
      budgetId,
      amount: {
        lt: 0,
      },

      createdAt: {
        gte: subHours(startOfWeek(new Date()), 12),
        lte: endOfWeek(new Date()),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return expenses;
}
