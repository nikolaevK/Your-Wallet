"use client";

import { useBudgetModal } from "@/hooks/use-budget-modal";
import { useEffect } from "react";

export default function RootPage() {
  const { onOpen, isOpen } = useBudgetModal();

  // Does not allow to close the modal if store does not exist
  useEffect(() => {
    // initially open Modal to choose or create new store
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
