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
import { Category, Currency, Expense } from "@prisma/client";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { ExpenseTable } from "./expense-table";
import { UpdateCategoryForm } from "./update-category-form";

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
  category: Category;
  currentExpensesSumForACategory: number;
}

export function CategoryDrawer({
  open,
  setOpen,
  currency,
  expenses,
  category,
  currentExpensesSumForACategory,
}: CategoryDrawerInterface) {
  const [windowDimensions, setWindowDimensions] = useState<Dimensions>();
  const [disableEdit, setDisableEdit] = useState(true);

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  if (windowDimensions && windowDimensions?.width > 500) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px] max-h-[70%] overflow-y-scroll">
          <DialogHeader className="mt-4">
            <div className="flex justify-between items-center">
              <DialogTitle>Monthly expenses</DialogTitle>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => setDisableEdit((prev) => !prev)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-8 p-4 w-full mb-6 h-full overflow-y-scroll">
            <ExpenseTable
              currency={currency}
              expenses={expenses}
              currentExpensesSumForACategory={currentExpensesSumForACategory}
            />
            <UpdateCategoryForm
              setOpen={setOpen}
              setDisableEdit={setDisableEdit}
              categoryName={category.categoryName}
              id={category.id}
              categoryLimit={category.categoryLimit.toString()}
              disableEdit={disableEdit}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-full ">
        <DrawerHeader className="text-left">
          <div className="flex justify-between items-center">
            <DrawerTitle>Monthly expenses</DrawerTitle>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setDisableEdit((prev) => !prev)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-8 p-4 w-full mb-6 h-full overflow-y-scroll">
          <div className="min-h-fit ">
            <ExpenseTable
              currency={currency}
              expenses={expenses}
              currentExpensesSumForACategory={currentExpensesSumForACategory}
            />
          </div>

          <UpdateCategoryForm
            setOpen={setOpen}
            setDisableEdit={setDisableEdit}
            disableEdit={disableEdit}
            categoryName={category.categoryName}
            id={category.id}
            categoryLimit={category.categoryLimit.toString()}
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
