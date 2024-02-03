import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { Prisma } from "@prisma/client";
import CategoryPieChart from "./category-pie-chart";

type CategoryWithExpenses = Prisma.CategoryGetPayload<{
  include: { expenses: true };
}>;

interface CategoryCartInterface {
  category: CategoryWithExpenses;
}

export default async function CategoryCard({
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
      // Need to deal with decimal additions which cause Floating Point Numbers problem
      Number((accumulator + Math.abs(Number(currentValue.amount))).toFixed(2)),
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
    <Card className="w-fit">
      <CardHeader className="text-center p-2">
        <CardTitle className="text-sm text-muted-foreground">
          {" "}
          {category.categoryName}
        </CardTitle>
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent className="flex flex-col items-center p-2">
        <CategoryPieChart data={data} />
        <div>
          {currency?.symbol} <span>{totalExpenses}</span> /
          <span className="text-muted-foreground">
            {" "}
            {category.categoryLimit as any}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
