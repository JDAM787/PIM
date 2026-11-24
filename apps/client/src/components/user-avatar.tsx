import type { UserSummaryDto } from '@pim/dtos';

import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: UserSummaryDto;
  className?: string;
}

/** Avatar con iniciales. Cuando haya fotos de perfil, se agrega aquí la imagen. */
export function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <span
      title={user.name}
      className={cn(
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.625rem] font-semibold text-primary-foreground',
        className
      )}
    >
      <span aria-hidden="true">{user.initials}</span>
      <span className="sr-only">{user.name}</span>
    </span>
  );
}
