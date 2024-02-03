import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prismadb from "@/lib/prismadb";
import { Currency } from "@prisma/client";

interface SavingsCardInterface {
  budgetId: string;
  currency: Currency;
}

export default async function SavingsCard({
  budgetId,
  currency,
}: SavingsCardInterface) {
  // Counts all total savings left after expenses
  // Positive numbers - negative
  const {
    _sum: { amount },
  } = await prismadb.expense.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      budgetId,
    },
  });

  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
  });

  return (
    <Card className="w-[160px] md:w-[250px] mb-4 ">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xs md:text-sm">Total Savings</CardTitle>
          <span className="text-muted-foreground text-xs md:text-sm">
            {currency.symbol}
          </span>
        </div>
      </CardHeader>
      <CardContent className="font-bold text-sm  md:text-2xl">
        <span>{formatCurrency.format(Number(Number(amount).toFixed(2)))}</span>
      </CardContent>
    </Card>
  );
}
