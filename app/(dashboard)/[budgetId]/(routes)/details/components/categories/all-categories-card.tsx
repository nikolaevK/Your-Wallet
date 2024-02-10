import { getCurrentMonthlyExpensesForEachCategory } from "@/actions/getCurrentMonthlyExpensesForEachCategory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category, Currency, Prisma } from "@prisma/client";

import DetailsCategoryCard from "./details-category-card";

type CategoryWithExpense = Prisma.CategoryGetPayload<{
  include: { expenses: true };
}>;

interface AllCategoriesCardInterface {
  budgetId: string;
  currency: Currency;
}

export default async function AllCategoriesCard({
  budgetId,
  currency,
}: AllCategoriesCardInterface) {
  const categories: CategoryWithExpense[] =
    await getCurrentMonthlyExpensesForEachCategory(budgetId);

  // Sum all current expenses for each category
  categories.forEach((category: CategoryWithExpense) => {
    // convert Type Decimal to Number
    category.categoryLimit = Number(category.categoryLimit);
    category.expenses.forEach(
      (expense) => (expense.amount = Math.abs(Number(expense.amount)))
    );
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-sm md:text-lg">Categories</CardTitle>
        <CardDescription className="text-xs md:text-base">
          See all the details about a category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {categories.map((category) => (
          <DetailsCategoryCard
            key={category.id}
            category={category}
            currency={currency}
          />
        ))}
      </CardContent>
    </Card>
  );
}
