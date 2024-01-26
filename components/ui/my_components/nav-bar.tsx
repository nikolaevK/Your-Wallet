"use client";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, Blocks, LayoutDashboard } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const { budgetId } = useParams();

  return (
    <>
      <section className="hidden md:block border-b">
        <div className="flex h-16 items-center px-4 font-semibold text-sm">
          <div className="flex justify-center items-center gap-2">
            <Link
              href={`/${budgetId}`}
              className={cn(
                "transition-colors dark:hover:text-white hover:text-black px-4 py-1 rounded-full",
                pathname === `/${budgetId}`
                  ? "text-black dark:text-white bg-gray-100 dark:bg-secondary"
                  : "text-muted-foreground"
              )}
            >
              <p>Dashboard</p>
            </Link>
            <Link
              href={`/${budgetId}/new-entry`}
              className={cn(
                "transition-colors dark:hover:text-white hover:text-black px-4 py-1 rounded-full",
                pathname === `/${budgetId}/new-entry`
                  ? "text-black dark:text-white bg-gray-100 dark:bg-secondary"
                  : "text-muted-foreground"
              )}
            >
              <p>New Entry</p>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </section>
      <section className="fixed block md:hidden bottom-0 w-full h-12 border-t z-10">
        <ul className="flex justify-between h-full items-center mx-6">
          <Link href="/">
            <LayoutDashboard
              className={cn(
                "h-8 w-8",
                pathname === "/"
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            />
          </Link>
          <Link href="/new-entry">
            <Blocks
              className={cn(
                "h-8 w-8",
                pathname === "/new-entry"
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            />
          </Link>
          <Link href={"/summary"}>
            <BarChart3
              className={cn(
                "h-8 w-8",
                pathname === "/add-expense"
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            />
          </Link>
          <ModeToggle />
        </ul>
      </section>
    </>
  );
}
