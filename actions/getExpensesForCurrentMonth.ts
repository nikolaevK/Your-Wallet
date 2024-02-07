import prismadb from "@/lib/prismadb";
import { endOfMonth, startOfMonth, formatRelative } from "date-fns";

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
  });

  const expenses = results.map((expense) => ({
    id: expense.id,
    expenseName: expense.expenseName,
    amount: Math.abs(Number(expense.amount)),
    createdAt: formatRelative(new Date(expense.createdAt), new Date()),
    comments: expense.comments ? expense.comments : "",
  }));

  return expenses;
}
