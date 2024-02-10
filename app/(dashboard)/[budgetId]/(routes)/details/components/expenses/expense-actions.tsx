"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/ui/my_components/AlertModal";
import { deleteExpense } from "@/actions/deleteExpense";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

import { Expense } from "./columns";
import { ExpenseDrawer } from "./expense-drawer";

interface ExpenseActionsInterface {
  expense: Expense;
}

export default function ExpenseActions({ expense }: ExpenseActionsInterface) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  async function deleteExp() {
    try {
      setLoading(true);
      const result = await deleteExpense(expense.id, expense.budgetId);
      setLoading(false);
      toast(`Expense ${result?.expenseName} has been deleted`);
      setConfirmationModalOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      window.alert(error);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={deleteExp}
        loading={loading}
      />
      <ExpenseDrawer open={open} setOpen={setOpen} expense={expense} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-5 md:h-8 w-5 md:w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setConfirmationModalOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
