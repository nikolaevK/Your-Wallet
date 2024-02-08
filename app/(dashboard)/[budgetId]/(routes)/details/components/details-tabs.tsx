import { getExpensesForCurrentMonth } from "@/actions/getExpensesForCurrentMonth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Currency } from "@prisma/client";
import { columns } from "./expenses/columns";
import { DataTable } from "./expenses/data-table";

interface DetailsTabsInterface {
  budgetId: string;
  currency: Currency;
}

export default async function DetailsTabs({
  budgetId,
  currency,
}: DetailsTabsInterface) {
  const result = await getExpensesForCurrentMonth(budgetId, undefined);

  const expenses = result.map((expense) => ({
    ...expense,
    currencyCode: currency.code,
  }));

  return (
    <Tabs defaultValue="category" className="w-full mt-4 md:mt-6 pb-20 md:my-0">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="category">Categories</TabsTrigger>
        <TabsTrigger value="expense">Expenses</TabsTrigger>
      </TabsList>
      <TabsContent value="category">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="expense">
        <DataTable data={expenses} columns={columns} searchKey="expenseName" />
      </TabsContent>
    </Tabs>
  );
}
