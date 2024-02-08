"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function deleteExpense(expenseId: string, budgetId: string) {
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  if (!expenseId) throw new Error("expenseId not specified");

  const deletedExpense = await prismadb.expense.delete({
    where: {
      id: expenseId,
    },
  });
  // reflect change in dashboard
  revalidatePath(`/${budgetId}`);
  revalidatePath(`/${budgetId}/details`);
  return deletedExpense;
}
