import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCategoryForm } from "./create-category-form";
import { CreateExpenseForm } from "./create-expense-form";

export default function InputForms({}) {
  console.log("server");
  return (
    <Tabs defaultValue="category" className="w-full my-14 md:my-0">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="category">Add Category</TabsTrigger>
        <TabsTrigger value="expense">Add Expense</TabsTrigger>
      </TabsList>
      <TabsContent value="category">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Add new category track expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CreateCategoryForm />
            <div></div>
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
            <CreateExpenseForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
