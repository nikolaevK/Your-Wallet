import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { Category, Prisma } from "@prisma/client";
import CategoryPieChart from "./category-pie-chart";

type CategoryWithExpenses = Prisma.CategoryGetPayload<{
  include: { expenses: true };
}>;

interface CategoryCartInterface {
  category: CategoryWithExpenses;
}

export default async function CategoryCart({
  category,
}: CategoryCartInterface) {
  // Extract currency information
  const budget = await prismadb.budget.findFirst({
    where: {
      id: category.budgetId,
    },
  });

  const currency = await prismadb.currency.findFirst({
    where: {
      id: budget?.currencyId,
    },
  });

  const totalExpenses = category.expenses.reduce(
    (accumulator, currentValue) =>
      accumulator + Math.abs(Number(currentValue.amount)),
    0
  );

  const differenceBetweenCategoryLimitAndExpenses =
    Number(category.categoryLimit) - totalExpenses;

  // If differenceBetweenCategoryLimitAndExpenses is negative than expenses exceed limit
  const data = [
    { name: "Group A", value: totalExpenses },
    {
      name: "Group B",
      value:
        differenceBetweenCategoryLimitAndExpenses < 0
          ? 0
          : differenceBetweenCategoryLimitAndExpenses,
    },
  ];

  return (
    <Card className="md:w-fit">
      <CardHeader className="text-center">
        <CardTitle className="text-md text-muted-foreground">
          {" "}
          {category.categoryName}
        </CardTitle>
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent className="flex flex-col items-center">
        <CategoryPieChart data={data} />

        <div>
          {currency?.symbol} <span>{totalExpenses}</span> /
          <span className="text-muted-foreground">
            {" "}
            {category.categoryLimit as number}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
