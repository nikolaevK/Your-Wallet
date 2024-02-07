import { getCurrentMonthlyExpensesForEachCategory } from "@/actions/getCurrentMonthlyExpensesForEachCategory";
import { getMonthTotalExpense } from "@/actions/getMonthTotalExpense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Currency, Expense } from "@prisma/client";
import ActiveShapePieChart from "./active-shape-pie-chart";

interface MonthlySpendInCategoryInterface {
  budgetId: string;
  currency: Currency;
}

export default async function MonthlySpendInCategory({
  budgetId,
  currency,
}: MonthlySpendInCategoryInterface) {
  const currentMonthlyExpenses = await getCurrentMonthlyExpensesForEachCategory(
    budgetId
  );

  const totalWeeklyExpense = Math.abs(
    Number(await getMonthTotalExpense(budgetId))
  );

  // Sum all current expenses for each category
  currentMonthlyExpenses.forEach((category) => {
    const sum = category.expenses.reduce(
      (accumulator, expense) =>
        // Need to deal with decimal additions which cause Floating Point Numbers problem
        Number((accumulator + Math.abs(Number(expense.amount))).toFixed(2)),
      0
    );
    category.expenses = [{ amount: sum }];
  });

  const chartData = currentMonthlyExpenses.map((category) => {
    return {
      categoryName: category.categoryName,
      value: category.expenses[0].amount,
    };
  });

  return (
    <Card className="h-full md:min-w-[300px]">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Total Expenses Per Month</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-[250px]  p-0">
        <ActiveShapePieChart
          data={chartData}
          totalWeeklyExpense={totalWeeklyExpense}
          currency={currency.code}
        />
      </CardContent>
    </Card>
  );
}
