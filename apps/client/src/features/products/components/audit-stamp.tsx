import type { UserSummaryDto } from '@pim/dtos';
import { Bot } from 'lucide-react';

import { UserAvatar } from '@/components/user-avatar';

import { formatDateTime } from '../format-date-time';

interface AuditStampProps {
  at: string;
  by: UserSummaryDto | null;
}

/** Fecha + autor. Sin autor = cambio hecho por el sistema. */
export function AuditStamp({ at, by }: AuditStampProps) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      {by ? (
        <UserAvatar user={by} />
      ) : (
        <span
          title="Sistema"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <Bot className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">Sistema</span>
        </span>
      )}
      <time dateTime={at}>{formatDateTime(at)}</time>
    </span>
  );
}
