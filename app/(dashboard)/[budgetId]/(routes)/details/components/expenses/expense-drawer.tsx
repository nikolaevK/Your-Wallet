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
import { useEffect, useState } from "react";
import { UpdateExpenseForm } from "./update-expense-form";
import { Expense } from "./columns";

type Dimensions = { width: number; height: number };

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

interface ExpenseDrawerInterface {
  open: boolean;
  setOpen: (arg: boolean) => void;
  expense: Expense;
}

export function ExpenseDrawer({
  open,
  setOpen,
  expense,
}: ExpenseDrawerInterface) {
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
          <UpdateExpenseForm
            expense={expense}
            setOpen={setOpen}
            className="p-4"
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-[90%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit expense</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <UpdateExpenseForm
          expense={expense}
          setOpen={setOpen}
          className="p-4 h-full"
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
