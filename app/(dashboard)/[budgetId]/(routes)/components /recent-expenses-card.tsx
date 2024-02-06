import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MinusCircle } from "lucide-react";
import { Currency } from "@prisma/client";
import { getWeeklyExpenses } from "@/actions/getWeeklyExpenses";

interface RecentExpensesCardInterface {
  budgetId: string;
  currency: Currency;
}

export default async function RecentExpensesCard({
  budgetId,
  currency,
}: RecentExpensesCardInterface) {
  // Fetching expenses for current week
  const expenses = await getWeeklyExpenses(budgetId);

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
  });

  return (
    <Card className="h-[250px] md:h-auto md:max-h-[430px] overflow-auto">
      <CardHeader>
        <CardTitle className="text-sm">Recent Expenses</CardTitle>
        <CardDescription>
          You made {expenses.length}{" "}
          {expenses.length > 1 ? "transactions" : "transaction"} this week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center pb-2"
          >
            <div className="flex justify-center items-center gap-2">
              <div>
                <MinusCircle color="#ff0000" className="h-3 w-3" />
              </div>
              <span className="text-xs">{expense.expenseName}</span>
            </div>
            <span className="font-medium text-primary text-xs">
              {formatCurrency.format(Math.abs(Number(expense.amount)))}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
