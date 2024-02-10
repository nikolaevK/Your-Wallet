"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { Category, Currency, Expense, Prisma } from "@prisma/client";
import { useState } from "react";
import { CategoryDrawer } from "./category-drawer";

type CategoryWithExpense = Prisma.CategoryGetPayload<{
  include: { expenses: true };
}>;

interface DetailsCategoryCardInterface {
  category: CategoryWithExpense;
  currency: Currency;
}

export default function DetailsCategoryCard({
  category,
  currency,
}: DetailsCategoryCardInterface) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const currentExpensesSumForACategory = category.expenses.reduce(
    (accumulator, expense) =>
      // Need to deal with decimal additions which cause Floating Point Numbers problem
      Number((accumulator + Math.abs(Number(expense.amount))).toFixed(2)),
    0
  );

  const percent = Math.round(
    (currentExpensesSumForACategory / (category.categoryLimit as number)) * 100
  );

  return (
    <>
      <CategoryDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        expenses={category.expenses}
        currency={currency}
        currentExpensesSumForACategory={currentExpensesSumForACategory}
      />
      <Card
        onClick={() => setOpenDrawer(true)}
        className="hover:cursor-pointer md:hover:bg-muted mb-4"
      >
        <CardHeader className="px-4 pb-1 pt-3 md:pb-0 md:px-6">
          <CardTitle className="text-xs md:text-lg">
            <div className="flex justify-between items-center">
              <span>{category.categoryName}</span>
              <span className="text-muted-foreground">
                {formatCurrency(
                  category.categoryLimit as number,
                  currency.code
                )}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 md:px-6 ">
          <div className="p-0">
            <div className="flex justify-between items-center text-[8px] md:text-sm py-1 text-muted-foreground">
              <span>
                {category.expenses.length}{" "}
                {category.expenses.length > 1 || category.expenses.length === 0
                  ? "transactions"
                  : "transaction"}{" "}
              </span>
              <span>{percent}%</span>
            </div>
            <Progress value={percent} className="bg-[#d0ecda] h-2" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
