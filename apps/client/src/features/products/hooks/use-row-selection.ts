import { useState } from 'react';

export interface RowSelection {
  isSelected: (id: string) => boolean;
  toggle: (id: string, selected: boolean) => void;
}

/** Selección de filas por id. `visibleIds` decide el estado del check "seleccionar todo". */
export function useRowSelection(visibleIds: readonly string[]) {
  const [selected, setSelected] = useState<ReadonlySet<string>>(
    () => new Set()
  );

  const toggle = (id: string, isOn: boolean) => {
    setSelected((previous) => {
      const next = new Set(previous);
      if (isOn) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const selectedVisible = visibleIds.filter((id) => selected.has(id)).length;
  const allState: boolean | 'indeterminate' =
    selectedVisible === 0
      ? false
      : selectedVisible === visibleIds.length || 'indeterminate';

  const toggleAll = (isOn: boolean) => {
    setSelected(isOn ? new Set(visibleIds) : new Set());
  };

  const selection: RowSelection = {
    isSelected: (id) => selected.has(id),
    toggle,
  };

  return { selection, allState, toggleAll };
}
