"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

interface createNewCategoryInterface {
  budgetId: string;
  categoryName: string;
  categoryLimit: string;
}

export async function createNewCategory(props: createNewCategoryInterface) {
  const { budgetId, categoryLimit, categoryName } = props;
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  try {
    const category = await prismadb.category.create({
      data: {
        budgetId,
        categoryName,
        categoryLimit: Number(categoryLimit),
      },
    });

    if (category) revalidatePath(`/${budgetId}/new-entry`);

    return category;
  } catch (error) {
    console.log(error);
  }
}
