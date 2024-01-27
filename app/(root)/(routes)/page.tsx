"use client";

import { useBudgetModal } from "@/hooks/use-budget-modal";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const { onOpen, isOpen } = useBudgetModal();
  const pathname = usePathname();

  // Does not allow to close the modal if budget does not exist
  useEffect(() => {
    console.log(pathname);
    // initially open BudgetModal to choose or create new store
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
