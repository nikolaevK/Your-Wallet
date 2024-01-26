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

  //   if (userId) {
  //     // redirects to other page for that particular store
  //     redirect(`/${store.id}`);
  //   }
  // If no store it will render children meaning nested route => page.tsx
  // It will trigger Create Store Modal
  return <>{children}</>;
}
