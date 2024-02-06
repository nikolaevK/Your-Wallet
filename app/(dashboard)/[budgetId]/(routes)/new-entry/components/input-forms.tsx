import prismadb from "@/lib/prismadb";
import { Category } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCategoryForm } from "./create-category-form";
import { CreateExpenseForm } from "./create-expense-form";
import AddIncomeForm from "./add-income-form";

export default async function InputForms({ budgetId }: { budgetId: string }) {
  const result: Category[] = await prismadb.category.findMany({
    where: {
      budgetId,
    },
  });

  // Adjust Type for the Decimal that comes from SQL server
  const categories = result.map((category: Category) => {
    return {
      ...category,
      // Extended Type to Decimal | Number
      categoryLimit: Number(category.categoryLimit),
    };
  });

  return (
    <Tabs defaultValue="category" className="w-full mt-14 pb-20 md:my-0">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="category">Add Category</TabsTrigger>
        <TabsTrigger value="expense">Add Expense</TabsTrigger>
        <TabsTrigger value="income">Add Income</TabsTrigger>
      </TabsList>
      <TabsContent value="category">
        <Card>
          <CardHeader>
            <CardTitle>Category</CardTitle>
            <CardDescription>Add new category track expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CreateCategoryForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="expense">
        <Card>
          <CardHeader>
            <CardTitle>Expense</CardTitle>
            <CardDescription>
              Create an expense in order to improve spending.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CreateExpenseForm categories={categories || []} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="income">
        <Card>
          <CardHeader>
            <CardTitle>Income</CardTitle>
            <CardDescription>New income</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AddIncomeForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
