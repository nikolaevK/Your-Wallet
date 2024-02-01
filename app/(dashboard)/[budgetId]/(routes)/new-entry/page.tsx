import InputForms from "./components/input-forms";

interface NewEntryInterface {
  params: { budgetId: string };
}

export default function NewEntry({ params: { budgetId } }: NewEntryInterface) {
  return (
    <div className="w-full pt-6 px-4">
      {/* @ts-expect-error Server Component */}
      <InputForms budgetId={budgetId} />
    </div>
  );
}
