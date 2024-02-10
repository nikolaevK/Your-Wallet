"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Currency, Expense } from "@prisma/client";
import { useEffect, useState } from "react";
import { ExpenseTable } from "./expense-table";

type Dimensions = { width: number; height: number };

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

interface CategoryDrawerInterface {
  open: boolean;
  setOpen: (arg: boolean) => void;
  currency: Currency;
  expenses: Expense[];
  currentExpensesSumForACategory: number;
}

export function CategoryDrawer({
  open,
  setOpen,
  currency,
  expenses,
  currentExpensesSumForACategory,
}: CategoryDrawerInterface) {
  const [windowDimensions, setWindowDimensions] = useState<Dimensions>();

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  if (windowDimensions && windowDimensions?.width > 500) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ExpenseTable
            currency={currency}
            expenses={expenses}
            currentExpensesSumForACategory={currentExpensesSumForACategory}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-[90%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Monthly expenses</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <ExpenseTable
            currency={currency}
            expenses={expenses}
            currentExpensesSumForACategory={currentExpensesSumForACategory}
          />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
