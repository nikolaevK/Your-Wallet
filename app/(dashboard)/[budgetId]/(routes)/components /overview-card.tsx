import getMonthlyExpenses from "@/actions/getMonthlyExpenses";
import prismadb from "@/lib/prismadb";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Overview from "./Overview";

interface OverviewCardInterface {
  budgetId: string;
}

export default async function OverviewCard({
  budgetId,
}: OverviewCardInterface) {
  const monthlyExpenses = await getMonthlyExpenses(budgetId);
  // Extract currency information
  const budget = await prismadb.budget.findFirst({
    where: {
      id: budgetId,
    },
  });

  const currency = await prismadb.currency.findFirst({
    where: {
      id: budget?.currencyId,
    },
  });
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-sm">Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-[320px] md:w-full ">
          <Overview data={monthlyExpenses || []} currency={currency!.symbol} />
        </div>
      </CardContent>
    </Card>
  );
}
