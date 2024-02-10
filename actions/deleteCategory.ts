"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function deleteCategory(categoryId: string, budgetId: string) {
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  if (!categoryId) throw new Error("categoryId not specified");

  await prismadb.expense.deleteMany({
    where: {
      categoryId,
    },
  });

  const category = await prismadb.category.delete({
    where: {
      id: categoryId,
    },
  });
  // reflect change in dashboard
  revalidatePath(`/${budgetId}`);
  revalidatePath(`/${budgetId}/details`);
  return category;
}
