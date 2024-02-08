"use client";

import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatRelative } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import ExpenseActions from "./expense-actions";

export type Expense = {
  id: string;
  budgetId: string;
  amount: number;
  expenseName: string;
  createdAt: string;
  comments?: string;
  currencyCode: string;
};

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "expenseName",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span>
          {formatCurrency(row.original.amount, row.original.currencyCode)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-primary">
        {formatRelative(new Date(row.original.createdAt), new Date(), {
          locale: row.original.currencyCode === "RUB" ? ru : enUS,
        })}
      </span>
    ),
  },
  {
    id: "actions",
    // extract original object with which Shadcn works when renders the row => BillBoardColumnType
    cell: ({ row }) => <ExpenseActions expense={row.original} />,
  },
];
