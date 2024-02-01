"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useParams } from "next/navigation";
import { createNewCategory } from "@/actions/createNewCategory";

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
import { toast } from "sonner";

const formSchema = z.object({
  categoryName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  categoryLimit: z.string().min(3, {
    message: "Limit must be more or equal than 100.",
  }),
});

export function CreateCategoryForm() {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categoryLimit: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      // This function runs on the server
      const category = await createNewCategory({
        ...values,
        budgetId: params.budgetId as string,
      });
      setLoading(false);
      form.reset();
      toast(`Category ${values.categoryName} has been created`);
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
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="name..." {...field} disabled={loading} />
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
          name="categoryLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spending Limit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="number"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormDescription>
                This is a limit for this category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? (
            <div className="animate-spin border-2 border-t-2 border-white-500 border-t-blue-600  h-5 w-5 border-spacing-1 rounded-full"></div>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
}
