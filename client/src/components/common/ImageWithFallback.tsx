import { useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback: ReactNode;
  fallbackClassName?: string;
}

/**
 * Renders the given <img>, but swaps to `fallback` if the src 404s — used
 * throughout the site so placeholder assets degrade gracefully until the
 * real files listed in ASSETS.md are dropped in (no code changes needed then).
 */
export function ImageWithFallback({
  fallback,
  fallbackClassName,
  className,
  onError,
  ...imgProps
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn("flex items-center justify-center", fallbackClassName ?? className)}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...imgProps}
    />
  );
}
