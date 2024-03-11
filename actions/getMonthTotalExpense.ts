"use server";
import prismadb from "@/lib/prismadb";
import { endOfMonth, startOfMonth, subHours } from "date-fns";

export async function getMonthTotalExpense(budgetId: string) {
  if (!budgetId) throw new Error("budgetId is required");

  const {
    _sum: { amount },
  } = await prismadb.expense.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      budgetId,
      amount: {
        lt: 0,
      },
      createdAt: {
        gte: subHours(startOfMonth(new Date()), 12),
        lte: endOfMonth(new Date()),
      },
    },
  });

  return amount;
}
