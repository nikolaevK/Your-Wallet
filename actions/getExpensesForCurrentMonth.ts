import prismadb from "@/lib/prismadb";
import { endOfMonth, startOfMonth } from "date-fns";

export async function getExpensesForCurrentMonth(budgetId: string) {
  if (!budgetId) throw new Error("budgetId is required");

  const results = await prismadb.expense.findMany({
    where: {
      budgetId,
      amount: {
        lt: 0,
      },
      createdAt: {
        gte: startOfMonth(new Date()),
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
