"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Currency, Expense } from "@prisma/client";
import { formatRelative } from "date-fns";
import { enUS, ru } from "date-fns/locale";

interface ExpenseTableInterface {
  expenses: Expense[];
  currency: Currency;
  currentExpensesSumForACategory: number;
}

export function ExpenseTable({
  expenses,
  currency,
  currentExpensesSumForACategory,
}: ExpenseTableInterface) {
  return (
    <Table>
      <TableCaption>A list of expenses for this category.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="p-4">
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">{expense.expenseName}</TableCell>

            <TableCell>
              {formatRelative(new Date(expense.createdAt), new Date(), {
                locale: currency.code === "RUB" ? ru : enUS,
              })}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(expense.amount as number, currency.code)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            {" "}
            {formatCurrency(
              currentExpensesSumForACategory as number,
              currency.code
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
