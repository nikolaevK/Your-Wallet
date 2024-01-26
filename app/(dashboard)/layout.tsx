import { auth } from "@clerk/nextjs";
import React from "react";
import { redirect } from "next/navigation";
import NavBar from "@/components/ui/my_components/nav-bar";

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

  // If Store doesn't exist send back to initial page
  // or someones puts random id

  // if (!budgetId) {
  //   redirect("/");
  // }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
