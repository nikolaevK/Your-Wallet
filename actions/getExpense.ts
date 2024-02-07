"use server";

import prismadb from "@/lib/prismadb";

export async function getExpense(expenseId: string) {
  if (!expenseId) throw new Error("expenseId is required");

  const expense = await prismadb.expense.findFirst({
    where: {
      id: expenseId,
    },
  });

  return expense;
}
