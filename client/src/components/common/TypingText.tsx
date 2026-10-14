import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  words: string[];
  className?: string;
}

export function TypingText({ words, className }: TypingTextProps) {
  const text = useTypewriter({ words });

  return (
    <span className={cn("inline-flex items-center text-accent", className)}>
      {text}
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-accent"
        aria-hidden="true"
      />
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
