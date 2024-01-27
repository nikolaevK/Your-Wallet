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

  const budget = await prismadb.budget.findFirst({
    where: {
      userId,
    },
  });

  // this should trigger the BudgetModal
  if (!budget) {
    redirect("/");
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
