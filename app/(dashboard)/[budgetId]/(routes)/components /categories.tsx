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

interface CategoriesProps {
  budgetId: string;
}

export default async function Categories({ budgetId }: CategoriesProps) {
  const categories = await prismadb.category.findMany({
    where: {
      budgetId,
    },
  });

  console.log(categories);

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
      <CardContent className="p-8 grid  md:grid-cols-4 lg:grid-cols-6 gap-4 ">
        <CategoryCart />
        <CategoryCart />
        <CategoryCart />
        <CategoryCart />

        {/* Extract in separate component */}
        {/* check if is a server component */}
        <Carousel className="md:hidden ">
          <CarouselContent className="w-[200px]">
            <CarouselItem className="w-full">
              <CategoryCart />
            </CarouselItem>
            <CarouselItem>
              <CategoryCart />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
