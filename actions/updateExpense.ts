"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

interface updateExpenseInterface {
  id: string;
  budgetId: string;
  expenseName: string;
  amount: string;
  comments?: string | undefined;
  createdAt: Date;
}

export async function updateExpense(props: updateExpenseInterface) {
  const { amount, id, comments, createdAt, budgetId, expenseName } = props;
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  // expense needs to be negative in database
  // it will be used to calculate different data
  // including total savings
  try {
    const expenses = await prismadb.expense.update({
      where: {
        id,
      },
      data: {
        amount: -Number(amount),
        expenseName,
        comments: comments ? comments : null,
        createdAt: createdAt,
      },
    });

    // reflect change in dashboard
    revalidatePath(`/${budgetId}`);
    revalidatePath(`/${budgetId}/details`);
    return expenses;
  } catch (error) {
    console.log(error);
  }
}
