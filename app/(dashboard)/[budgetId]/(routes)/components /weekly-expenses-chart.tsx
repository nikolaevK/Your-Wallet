import { getWeeklyExpenses } from "@/actions/getWeeklyExpenses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Currency } from "@prisma/client";
import { getDay } from "date-fns";
import { Variable } from "lucide-react";
import ExpensesChart from "./expenses-chart";

interface WeeklyExpensesChartInterface {
  budgetId: string;
  currency: Currency;
}

type ShortWeekMap = {
  [key: number]: string;
};

const shortWeek: ShortWeekMap = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export default async function WeeklyExpensesChart({
  budgetId,
  currency,
}: WeeklyExpensesChartInterface) {
  const expenses = await getWeeklyExpenses(budgetId);

  // TODO: Refactor this reduce with Variable
  // Add all expenses for each particular day based on createAt
  const graphDataToDisplay = expenses.reduce(
    (accumulator, currentValue) => {
      if (
        accumulator[getDay(currentValue.createdAt)] !== null &&
        currentValue
      ) {
        accumulator[getDay(currentValue.createdAt)].amount =
          accumulator[getDay(currentValue.createdAt)].amount +
          Math.abs(Number(currentValue.amount));
      } else {
        accumulator[getDay(currentValue.createdAt)] = {
          ...accumulator[getDay(currentValue.createdAt)],
          amount:
            accumulator[getDay(currentValue.createdAt)].amount +
            Math.abs(Number(currentValue.amount)),
        };
      }
      return accumulator;
    },
    // Create default array of objects with Name of the week with index 0 being Sunday
    Array.from({ length: Object.keys(shortWeek).length }, (_, index) => ({
      name: shortWeek[index],
      amount: 0,
    }))
  );

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm">Weekly Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] p-0">
        <ExpensesChart data={graphDataToDisplay} currency={currency.symbol} />
      </CardContent>
    </Card>
  );
}
