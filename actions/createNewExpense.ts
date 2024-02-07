"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

interface createNewExpenseInterface {
  budgetId: string;
  categoryId: string;
  expenseName: string;
  amount: string;
  comments?: string | null;
  createdAt?: Date | null;
}

export async function createNewExpense(props: createNewExpenseInterface) {
  const { amount, budgetId, comments, createdAt, expenseName, categoryId } =
    props;
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  // expense needs to be negative in database
  // it will be used to calculate different data
  // including total savings
  try {
    const expenses = await prismadb.expense.create({
      data: {
        amount: -Number(amount),
        expenseName,
        budgetId,
        categoryId,
        comments: comments ? comments : null,
        createdAt: createdAt ? createdAt : new Date(),
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
