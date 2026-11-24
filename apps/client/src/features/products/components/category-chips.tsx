const chipClass =
  'inline-flex items-center whitespace-nowrap rounded-md border bg-background px-2 py-0.5 text-xs';

/** Primera categoría + contador del resto ("Stickers +1"). */
export function CategoryChips({ categories }: { categories: string[] }) {
  const [first, ...rest] = categories;
  if (!first) return null;

  return (
    <span
      className="flex min-w-0 items-center gap-1"
      title={categories.join(', ')}
    >
      <span className={`${chipClass} min-w-0 max-w-[8rem]`}>
        <span className="truncate">{first}</span>
      </span>
      {rest.length > 0 && <span className={chipClass}>+{rest.length}</span>}
    </span>
  );
}
