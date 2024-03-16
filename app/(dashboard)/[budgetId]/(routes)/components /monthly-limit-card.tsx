import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import prismadb from "@/lib/prismadb";
import { Currency } from "@prisma/client";
import { endOfMonth, startOfMonth, subHours } from "date-fns";

interface MonthlyLimitCardInterface {
  budgetId: string;
  currency: Currency;
}

export default async function MonthlyLimitCard({
  budgetId,
  currency,
}: MonthlyLimitCardInterface) {
  const {
    _sum: { categoryLimit },
  } = await prismadb.category.aggregate({
    _sum: {
      categoryLimit: true,
    },
    where: {
      budgetId,
    },
  });

  const {
    _sum: { amount },
  } = await prismadb.expense.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      budgetId,
      amount: {
        lt: 0,
      },
      createdAt: {
        gte: subHours(startOfMonth(new Date()), 12),
        lte: endOfMonth(new Date()),
      },
    },
  });

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
  });

  const monthlyLimit = Number(Number(categoryLimit).toFixed(2));
  const monthlyTotalExpenses = Math.abs(Math.round(Number(amount)));

  const ratio = Math.round((monthlyTotalExpenses / Number(monthlyLimit)) * 100);

  return (
    <Card className="w-full ">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xs md:text-sm">Monthly Limit</CardTitle>
          <span className="text-muted-foreground text-xs md:text-sm">
            {currency.symbol}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 font-bold text-sm  md:text-2xl">
        <span>{formatCurrency.format(monthlyLimit)}</span>
        <Progress value={ratio} className="bg-[#d0ecda] h-2" />
      </CardContent>
    </Card>
  );
}
