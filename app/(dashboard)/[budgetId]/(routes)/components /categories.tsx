import prismadb from "@/lib/prismadb";
import { Category } from "@prisma/client";
import { endOfMonth, startOfMonth } from "date-fns";

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
  });

  return (
    <Card className="w-full">
      <CardHeader>
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
            categories.map((category) => {
              /* @ts-expect-error Server Component */
              return <CategoryCart key={category.id} category={category} />;
            })}
        </div>

        {/* Mobile Css */}
        <Carousel className="md:hidden ">
          <CarouselContent>
            {categories &&
              categories.map((category) => {
                return (
                  <CarouselItem className="basis-1/2" key={category.id}>
                    {
                      /* @ts-expect-error Server Component */
                      <CategoryCart category={category} />
                    }
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
