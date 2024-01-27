"use client";

import { useBudgetModal } from "@/hooks/use-budget-modal";

import { useEffect } from "react";

export default function RootPage() {
  const { onOpen, isOpen } = useBudgetModal();

  // Does not allow to close the modal if budget does not exist
  useEffect(() => {
    // initially opens BudgetModal to create new Budget
    // timer is needed in order to prevent blinking when router pushes to a new route
    // when there is other route, Modal must close
    let timer = setTimeout(() => {
      if (!isOpen) onOpen();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, onOpen]);

  return null;
}
