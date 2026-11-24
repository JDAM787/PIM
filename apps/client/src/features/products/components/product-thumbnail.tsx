import { ImageOff } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ProductThumbnailProps {
  url: string | null;
  label: string;
  className?: string;
}

/** Miniatura del producto; sin imagen muestra un marcador neutro. */
export function ProductThumbnail({
  url,
  label,
  className,
}: ProductThumbnailProps) {
  const box = cn(
    'flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted',
    className
  );

  if (!url) {
    return (
      <span className={box} title="Sin imagen">
        <ImageOff
          className="h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
      </span>
    );
  }

  return (
    <span className={box}>
      <img
        src={url}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </span>
  );
}
