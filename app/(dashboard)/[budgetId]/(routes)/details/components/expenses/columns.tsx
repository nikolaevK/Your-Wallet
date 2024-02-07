"use client";

import { ColumnDef } from "@tanstack/react-table";
import ExpenseActions from "./expense-actions";

export type Expense = {
  id: string;
  amount: string;
  expenseName: string;
  createdAt: string;
  comments?: string;
};

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "expenseName",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-primary">{row.original.createdAt}</span>
    ),
  },
  {
    id: "actions",
    // extract original object with which Shadcn works when renders the row => BillBoardColumnType
    cell: ({ row }) => <ExpenseActions expense={row.original} />,
  },
];
