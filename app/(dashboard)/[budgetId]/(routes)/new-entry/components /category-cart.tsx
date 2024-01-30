import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import CategoryPieChart from "./category-pie-chart";

export default function CategoryCart() {
  return (
    <Card className="md:w-fit">
      <CardHeader className="text-center">
        <CardTitle className="text-md"> Category Title</CardTitle>
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent className="flex flex-col items-center">
        <p>Example Category</p>
        <CategoryPieChart />
        <span>
          $ 1000 of<span className="text-muted-foreground"> 20000</span>
        </span>
      </CardContent>
    </Card>
  );
}
