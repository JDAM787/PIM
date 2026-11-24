import type { ProductStatus } from '@pim/dtos';
import { Check, FilePen } from 'lucide-react';

import { cn } from '@/lib/utils';

import { statusLabels } from '../product-labels';

export function StatusBadge({ status }: { status: ProductStatus }) {
  const completed = status === 'completed';
  const Icon = completed ? Check : FilePen;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium',
        completed
          ? 'bg-success/30 text-success-foreground'
          : 'border border-dashed text-muted-foreground'
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
