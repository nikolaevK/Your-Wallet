"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

interface createNewExpenseInterface {
  budgetId: string;
  incomeName: string;
  incomeAmount: string;
  comments?: string | null;
  createdAt?: Date | null;
}

export async function addNewIncome(props: createNewExpenseInterface) {
  const { incomeAmount, budgetId, comments, createdAt, incomeName } = props;
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  // income needs to be positive in database
  // it will be used to calculate different data
  // including total savings
  try {
    const income = await prismadb.expense.create({
      data: {
        amount: Number(incomeAmount),
        expenseName: incomeName,
        budgetId,
        comments: comments ? comments : null,
        createdAt: createdAt ? createdAt : new Date(),
      },
    });

    // reflect change in dashboard
    revalidatePath(`/${budgetId}`);
    return income;
  } catch (error) {
    console.log(error);
  }
}
