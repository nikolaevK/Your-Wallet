"use client";

import { Budget } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useBudgetModal } from "@/hooks/use-budget-modal";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown, PlusCircle, Wallet } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface BudgetOptionsModalProps extends PopoverTriggerProps {
  items: Budget[] | [];
}

export default function BudgetOptionsModal({
  items,
  className,
}: BudgetOptionsModalProps) {
  const [budgetOptionsOpen, setBudgetOptionsOpen] = useState(false);
  const { onOpen } = useBudgetModal();

  const params = useParams();
  const router = useRouter();

  const formattedBudgets = items.map((budget) => ({
    label: budget.budgetName,
    budgetId: budget.id,
  }));

  const currentBudget = formattedBudgets.find(
    (budget) => budget.budgetId === params.budgetId
  );

  function onBudgetSelect(budgetId: string) {
    setBudgetOptionsOpen(false);
    router.push(`/${budgetId}`);
  }

  return (
    <Popover open={budgetOptionsOpen} onOpenChange={setBudgetOptionsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={budgetOptionsOpen}
          aria-label="Select Budget"
          className={cn("w-auto md:w-[200px] justify-between", className)}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {currentBudget?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search budget..." />
          <CommandList>
            <CommandEmpty>No budgets found</CommandEmpty>
            <CommandGroup heading="Budgets">
              {formattedBudgets.map((budget) => (
                <CommandItem
                  key={budget.budgetId}
                  onSelect={() => onBudgetSelect(budget.budgetId)}
                  className="text-sm"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {budget.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentBudget?.budgetId === budget.budgetId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setBudgetOptionsOpen(false);
                  // function from UseStore Hook
                  // To engage Create Budget Modal
                  onOpen();
                }}
                className="hover:cursor-pointer"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Budget
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
