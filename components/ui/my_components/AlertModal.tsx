"use client";

import { Button } from "@/components/ui/button";
import Modal from "./modal";

interface AlertModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function AlertModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: AlertModalInterface) {
  return (
    <Modal
      title="Are you sure?"
      description="This cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-center w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
