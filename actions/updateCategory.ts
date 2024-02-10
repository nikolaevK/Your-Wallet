"use server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

interface createNewCategoryInterface {
  id: string;
  budgetId: string;
  categoryName: string;
  categoryLimit: string;
}

export async function updateCategory(props: createNewCategoryInterface) {
  const { budgetId, categoryLimit, categoryName, id } = props;
  const { userId } = auth();

  if (!userId) throw new Error("Not authorized");

  try {
    const category = await prismadb.category.update({
      where: {
        id,
      },
      data: {
        categoryName,
        categoryLimit: Number(categoryLimit),
      },
    });

    if (category) {
      revalidatePath(`/${budgetId}`);
      revalidatePath(`/${budgetId}/details`);
    }

    return category;
  } catch (error) {
    console.log(error);
  }
}
