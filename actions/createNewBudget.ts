"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function createNewBudget(budgetName: string, userId: string) {
  const { userId: signedInUser } = auth();

  if (!userId) throw new Error("Provide userId");

  if (signedInUser !== userId) throw new Error("Not authorized");

  try {
    const budget = await prismadb.budget.create({
      data: {
        budgetName,
        userId,
      },
    });

    // Updates the path with new data
    revalidatePath(`/${budget.id}`);
    return budget;
  } catch (error) {
    console.log(error);
  }
}
