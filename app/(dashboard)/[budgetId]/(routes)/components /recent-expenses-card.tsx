import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function RecentExpensesCard({}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="p-0"></CardContent>
    </Card>
  );
}
