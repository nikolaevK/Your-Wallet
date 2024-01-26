import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function InitialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const budget = await prismadb.budget.findFirst({
    where: {
      userId,
    },
  });

  const budgets = await prismadb.budget.findMany({
    where: {
      userId,
    },
  });

  console.log(budgets);

  if (budget) {
    // redirects to other page for that particular store
    redirect(`/${budget.id}`);
  }
  // If no store it will render children meaning nested route => page.tsx
  // It will trigger Create Store Modal
  return <>{children}</>;
}
