import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CategoryCart from "./category-cart";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import prismadb from "@/lib/prismadb";
import { Category, Prisma } from "@prisma/client";
import { endOfMonth, format, startOfMonth } from "date-fns";

type CategoryWithExpenses = Prisma.CategoryGetPayload<{
  include: { expenses: true };
}>;

interface CategoriesProps {
  budgetId: string;
}

export default async function Categories({ budgetId }: CategoriesProps) {
  // TODO: Need to query monthly expenses inside include somehow
  const result = await prismadb.category.findMany({
    where: {
      budgetId,
    },
    include: {
      expenses: {
        select: {
          amount: true,
        },
        where: {
          // Less than zero getting expenses with negative nums
          amount: {
            lt: 0,
          },
          // gets expenses which are made for current month
          createdAt: {
            gte: startOfMonth(new Date()),
            lte: endOfMonth(new Date()),
          },
        },
      },
    },
  });

  // Adjust Type for the Decimal that comes from SQL server
  const categories = result.map((category: Category) => {
    return {
      ...category,
      // Extended Type to Decimal | Number
      categoryLimit: Number(category.categoryLimit),
    };
  }) as CategoryWithExpenses[];

  return (
    <Card className="w-full px-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <CardTitle>Categories</CardTitle>
            <Separator orientation="vertical" className="h-6" />
            <div>View all</div>
          </div>
          <Button>Create</Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-8">
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories &&
            categories.map((category) => {
              /* @ts-expect-error Server Component */
              return <CategoryCart key={category.id} category={category} />;
            })}
        </div>

        {/* Mobile Css */}
        <Carousel className="md:hidden ">
          <CarouselContent className="w-[200px]">
            {categories &&
              categories.map((category) => {
                return (
                  <CarouselItem className="w-full" key={category.id}>
                    {
                      /* @ts-expect-error Server Component */
                      <CategoryCart category={category} />
                    }
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
