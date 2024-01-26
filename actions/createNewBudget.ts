"use server";

import prismadb from "@/lib/prismadb";

export async function createNewBudget({
  name,
  userId,
}: {
  userId: string;
  name: string;
}) {
  try {
    const budget = await prismadb.budget.create({
      data: {
        budgetName: name,
        userId,
      },
    });

    return budget;
  } catch (error) {
    console.log(error);
  }
}
