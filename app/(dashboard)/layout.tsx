import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NavBar from "@/components/ui/my_components/nav-bar";
import prismadb from "@/lib/prismadb";

interface LayoutInterface {
  children: React.ReactNode;
  params: { budgetId: string };
}

// Server component
export default async function layout({
  children,
  params: { budgetId },
}: LayoutInterface) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const budgets = await prismadb.budget.findMany({
    where: {
      userId,
    },
  });

  // this should trigger the BudgetModal
  if (!budgets) {
    redirect("/");
  }

  return (
    <>
      <NavBar budgets={budgets} />
      {children}
    </>
  );
}
