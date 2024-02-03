import prismadb from "@/lib/prismadb";
import { endOfWeek, startOfWeek } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MinusCircle } from "lucide-react";
import { Currency } from "@prisma/client";

interface RecentExpensesCardInterface {
  budgetId: string;
  currency: Currency;
}

export default async function RecentExpensesCard({
  budgetId,
  currency,
}: RecentExpensesCardInterface) {
  // Fetching expenses for current week
  const expenses = await prismadb.expense.findMany({
    where: {
      budgetId,
      amount: {
        lt: 0,
      },

      createdAt: {
        gte: startOfWeek(new Date()),
        lte: endOfWeek(new Date()),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
  });

  return (
    <Card className="h-[250px] md:h-auto md:max-h-[430px] overflow-auto">
      <CardHeader>
        <CardTitle className="text-sm">Recent Expenses</CardTitle>
        <CardDescription>
          You made {expenses.length} transactions this week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center pb-2"
          >
            <div className="flex justify-center items-center gap-2">
              <div className="mt-1">
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
