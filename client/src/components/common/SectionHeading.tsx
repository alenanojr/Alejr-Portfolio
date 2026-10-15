import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex flex-col gap-2 sm:gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs">
        {eyebrow}
      </span>
      <h2 className="balance text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "balance max-w-2xl text-sm text-muted-foreground sm:text-lg",
            align === "center" ? "mx-auto text-center" : "text-left"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
