import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { ExperienceEntry } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { Badge } from "@/components/ui/badge";

interface TimelineItemProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col gap-6 pl-14 sm:grid sm:grid-cols-2 sm:gap-8 sm:pl-0">
      <span
        aria-hidden="true"
        className="absolute left-4 top-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-accent sm:left-1/2"
      >
        <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
      </span>

      <motion.div
        initial={{ opacity: 0, x: isEven ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={isEven ? "sm:col-start-1" : "sm:col-start-2"}
      >
        <GlassCard className="flex flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-2">
            {entry.current && <Badge variant="accent">Current</Badge>}
            <span className="text-xs text-muted-foreground">{entry.period}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">{entry.role}</h3>
          <p className="text-sm font-medium text-accent">{entry.company}</p>
          <p className="-mt-2 text-xs text-muted-foreground">{entry.address}</p>

          <ul className="mt-2 flex flex-col gap-2">
            {entry.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>

          {entry.systems && entry.systems.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.systems.map((system) => (
                <Badge key={system} variant="outline">
                  {system}
                </Badge>
              ))}
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
