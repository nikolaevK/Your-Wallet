import "./globals.css";
import { auth, ClerkProvider } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Inter as FontSans } from "next/font/google";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/ui/theme-provider";
import BudgetModal from "@/components/ui/my_components/budget-modal";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Your Wallet",
  description: "Manage your wallet",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <BudgetModal userId={userId} />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
