"use client";

import * as React from "react";

import { endOfMonth, format, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { getExpensesForCurrentMonth } from "@/actions/getExpensesForCurrentMonth";
import { useParams } from "next/navigation";

import { getCurrency } from "@/actions/getCurrency";

export function DatePickerWithRange({ setData }: any) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  const params = useParams();

  async function fetchNewDateRange(range: DateRange | undefined) {
    setDate(range);
    try {
      const result = await Promise.all([
        getExpensesForCurrentMonth(params.budgetId as string, range),
        getCurrency(params.budgetId as string),
      ]);

      const expenses = result[0].map((expense) => ({
        ...expense,
        currencyCode: result[1]!.code,
      }));
      // sets new data in same format into the table
      setData(expenses);
    } catch (error) {}
  }

  return (
    <div className={cn("grid gap-2 w-full md:max-w-min")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full md:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={fetchNewDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
