"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";

import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addNewIncome } from "@/actions/addNewIncome";

const formSchema = z.object({
  incomeName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  incomeAmount: z.string().min(1, {
    message: "Expense should be more than zero.",
  }),
  comments: z.string().optional(),
  createdAt: z.date().optional(),
});

export default function AddIncomeForm() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incomeName: "",
      incomeAmount: "",
      comments: undefined,
      createdAt: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const expense = await addNewIncome({
        ...values,
        budgetId: params.budgetId as string,
      });
      setLoading(false);
      form.reset();
      toast(`Income ${expense?.expenseName} has been created`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      window.alert(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="incomeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income Name</FormLabel>
              <FormControl>
                <Input placeholder="name..." disabled={loading} {...field} />
              </FormControl>
              <FormDescription>
                This is a name which will be displayed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="incomeAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="amount"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormDescription>Add income.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] md:w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Date will be chosen by default, unless it needs to be allocated
                to other period
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  disabled={loading}
                  placeholder="Write additional information"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can write additional description about an income
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? (
            <div className="animate-spin border-2 border-t-2 border-white-500 border-t-blue-600  h-5 w-5 border-spacing-1 rounded-full"></div>
          ) : (
            "Add income"
          )}
        </Button>
      </form>
    </Form>
  );
}
