"use server";
import prismadb from "@/lib/prismadb";
import { endOfMonth, startOfMonth } from "date-fns";

export async function getCurrentMonthlyExpensesForEachCategory(
  budgetId: string
) {
  if (!budgetId) throw new Error("budgetId is required");

  const categoriesWithExpensesForCurrentMonth =
    await prismadb.category.findMany({
      where: {
        budgetId,
      },
      include: {
        expenses: {
          select: {
            amount: true,
          },
          where: {
            // Less than zero getting expenses with negative nums
            amount: {
              lt: 0,
            },
            // gets expenses which are made for current month
            createdAt: {
              gte: startOfMonth(new Date()),
              lte: endOfMonth(new Date()),
            },
          },
        },
      },
    });

  return categoriesWithExpensesForCurrentMonth;
}
