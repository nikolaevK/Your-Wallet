"use server";
import prismadb from "@/lib/prismadb";
import { endOfYear, startOfYear } from "date-fns";

export default async function getMonthlyExpenses(budgetId: string) {
  const expenses = await prismadb.expense.findMany({
    where: {
      budgetId,
      amount: {
        lt: 0,
      },
      createdAt: {
        gte: startOfYear(new Date()),
        lte: endOfYear(new Date()),
      },
    },
  });

  const monthlySpending: Record<number, number> = {};

  for (let expense of expenses) {
    // January = 0 => December = 11
    const month = expense.createdAt.getMonth();

    let expenseAmount = Math.abs(Number(expense.amount));
    // adding expenses for a particular month
    // Need to deal with decimal additions which cause Floating Point Numbers problem
    monthlySpending[month] = Number(
      ((monthlySpending[month] || 0) + expenseAmount).toFixed(2)
    );
  }

  const monthsData: { name: string; total: number }[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (let month in monthlySpending) {
    monthsData[parseInt(month)].total = monthlySpending[parseInt(month)];
  }

  return monthsData;
}
