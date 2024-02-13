"use client";
// Executes on the client

import { z } from "zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewBudget } from "@/actions/createNewBudget";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBudgetModal } from "@/hooks/use-budget-modal";
import Modal from "@/components/ui/my_components/modal";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

const formSchema = z.object({
  budgetName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  currency: z.object({
    name: z.string(),
    code: z.string(),
    symbol: z.string(),
  }),
});

const currenciesArray = [
  {
    name: "United States Dollar",
    code: "USD",
    symbol: "$",
  },
  {
    name: "Euro",
    code: "EUR",
    symbol: "€",
  },
  {
    name: "Japanese Yen",
    code: "JPY",
    symbol: "¥",
  },
  {
    name: "British Pound Sterling",
    code: "GBP",
    symbol: "£",
  },
  {
    name: "Russian Ruble",
    code: "RUB",
    symbol: "₽",
  },
  {
    name: "Chinese Yuan",
    code: "CNY",
    symbol: "¥",
  },
  {
    name: "Indian Rupee",
    code: "INR",
    symbol: "₹",
  },
  {
    name: "Australian Dollar",
    code: "AUD",
    symbol: "A$",
  },
  {
    name: "Canadian Dollar",
    code: "CAD",
    symbol: "CA$",
  },
  {
    name: "Brazilian Real",
    code: "BRL",
    symbol: "R$",
  },
  // Add more currencies as needed
];

type FormSchema = z.infer<typeof formSchema>;

export default function BudgetModal({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, initialBudgetLoad } = useBudgetModal();
  const router = useRouter();

  // extracting the type from formSchema
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetName: "",
      currency: undefined,
    },
  });

  async function onSubmit({ budgetName, currency }: FormSchema) {
    try {
      setLoading(true);
      // This function runs on the server
      const budget = await createNewBudget(budgetName, userId, currency);
      if (budget) router.push(`/${budget.id}`);
      // Is needed for initial budget creation in order to close budgetModal
      // once budget is created
      initialBudgetLoad();
      setLoading(false);
      form.reset();
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      window.alert(error);
    }
  }
  return (
    <Modal
      title="Create Budget"
      description="Add new budget to manage expenses and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-2">
                <FormField
                  control={form.control}
                  name="budgetName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Budget"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Currency</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[150px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? currenciesArray.find(
                                    (currency) =>
                                      currency.code === field.value?.code
                                  )?.code
                                : "Select currency"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search currency..." />
                            <CommandEmpty>Currency not found</CommandEmpty>
                            <CommandGroup>
                              {currenciesArray.map((currency) => (
                                <CommandItem
                                  value={currency.code}
                                  key={currency.code}
                                  onSelect={() => {
                                    form.setValue("currency", currency);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      currency.code === field.value?.code
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {currency.code}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin border-2 border-t-2 border-white-500 border-t-blue-600  h-5 w-5 border-spacing-1 rounded-full"></div>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
