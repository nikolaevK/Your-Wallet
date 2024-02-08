import { Category, Currency, Prisma } from "@prisma/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CategoryCart from "./category-card";
import Link from "next/link";
import { getCurrentMonthlyExpensesForEachCategory } from "@/actions/getCurrentMonthlyExpensesForEachCategory";

type Expenses = Prisma.CategoryGetPayload<{
  include: { expenses: true };
}>;

interface CategoriesProps {
  budgetId: string;
  currency: Currency;
}

export default async function Categories({
  budgetId,
  currency,
}: CategoriesProps) {
  const result = await getCurrentMonthlyExpensesForEachCategory(budgetId);

  // TODO: Fix the type of Category which includes Expenses
  // Adjust Type for the Decimal that comes from SQL server
  const categories = result.map((category: Category) => {
    return {
      ...category,
      // Extended Type to Decimal | Number
      categoryLimit: Number(category.categoryLimit),
    };
  }) as any;

  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <CardTitle className="text-sm">Categories</CardTitle>
            <Separator orientation="vertical" className="h-6" />
            <a className="text-xs">View all</a>
          </div>
          <Link href={`/${budgetId}/new-entry`}>
            <Button variant="link">Create</Button>
          </Link>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        {/* full screen */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-6">
          {categories &&
            categories.map((category: any) => {
              return (
                <CategoryCart
                  key={category.id}
                  category={category}
                  currency={currency}
                />
              );
            })}
        </div>

        {/* Mobile Css */}
        <Carousel className="md:hidden ">
          <CarouselContent>
            {categories &&
              categories.map((category: any) => {
                return (
                  <CarouselItem className="basis-1/2" key={category.id}>
                    {<CategoryCart category={category} currency={currency} />}
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </CardContent>
    </Card>
  );
}
