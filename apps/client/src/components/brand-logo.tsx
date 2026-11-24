import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  /** `false` muestra solo el monograma (riel lateral). */
  showName?: boolean;
}

/** Logo provisional de PIM: monograma + nombre, coloreado con los tokens del tema. */
export function BrandLogo({ className, showName = true }: BrandLogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
      >
        P
      </span>
      <span
        className={cn(
          'text-lg font-semibold tracking-tight',
          !showName && 'sr-only'
        )}
      >
        PIM
      </span>
    </div>
  );
}
