"use server";
import prismadb from "@/lib/prismadb";
import { endOfMonth, startOfMonth, subDays, subHours } from "date-fns";

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
            budgetId: true,
            expenseName: true,
            categoryId: true,
            id: true,
            comments: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            // Less than zero getting expenses with negative nums
            amount: {
              lt: 0,
            },
            // gets expenses which are made for current month
            createdAt: {
              gte: subHours(startOfMonth(new Date()), 12),
              lte: endOfMonth(new Date()),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  return categoriesWithExpensesForCurrentMonth;
}
