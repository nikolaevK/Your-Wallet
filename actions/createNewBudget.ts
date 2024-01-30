"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

interface Currency {
  symbol: string;
  code: string;
  name: string;
}

export async function createNewBudget(
  budgetName: string,
  userId: string,
  currency: Currency
) {
  const { userId: signedInUser } = auth();

  if (!userId) throw new Error("Provide userId");

  if (signedInUser !== userId) throw new Error("Not authorized");

  try {
    const createdCurrency = await prismadb.currency.create({
      data: currency,
    });

    const budget = await prismadb.budget.create({
      data: {
        budgetName,
        userId,
        currencyId: createdCurrency.id,
      },
    });

    // Updates the path with new data
    if (budget.id) revalidatePath(`/${budget.id}`);
    return budget;
  } catch (error) {
    console.log(error);
  }
}
