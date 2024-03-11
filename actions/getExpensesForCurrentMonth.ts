"use server";

import prismadb from "@/lib/prismadb";
import { endOfMonth, startOfMonth, subHours } from "date-fns";
import { DateRange } from "react-day-picker";

export async function getExpensesForCurrentMonth(
  budgetId: string,
  range: DateRange | undefined
) {
  if (!budgetId) throw new Error("budgetId is required");

  if (!range) {
    const results = await prismadb.expense.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    const expenses = results.map((expense) => ({
      id: expense.id,
      budgetId: expense.budgetId,
      expenseName: expense.expenseName,
      amount: Math.abs(Number(expense.amount)),
      createdAt: expense.createdAt.toString(),
      comments: expense.comments ? expense.comments : undefined,
    }));

    return expenses;
  }

  const results = await prismadb.expense.findMany({
    where: {
      budgetId,
      amount: {
        lt: 0,
      },
      createdAt: {
        gte: subHours(range.from!, 12),
        lte: range.to,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const expenses = results.map((expense) => ({
    id: expense.id,
    budgetId: expense.budgetId,
    expenseName: expense.expenseName,
    amount: Math.abs(Number(expense.amount)),
    createdAt: expense.createdAt.toString(),
    comments: expense.comments ? expense.comments : undefined,
  }));

  return expenses;
}
