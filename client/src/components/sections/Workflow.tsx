import {
  ClipboardList,
  GitBranch,
  MessagesSquare,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { workflowGroups } from "@/data/workflow";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GlassCard } from "@/components/common/GlassCard";
import { Badge } from "@/components/ui/badge";

const ICONS: Record<string, LucideIcon> = {
  planning: ClipboardList,
  "version-control": GitBranch,
  communication: MessagesSquare,
  "ai-assisted-development": Bot,
};

export function Workflow() {
  return (
    <section id="workflow" className="scroll-mt-12 pt-6 pb-9 sm:pt-12 sm:pb-8">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Development Workflow"
          title="How I Work"
          description="The tools and habits that keep my development process organized, collaborative, and efficient."
        />

        <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
          {workflowGroups.map((group, index) => {
            const Icon = ICONS[group.id] ?? ClipboardList;
            return (
              <GlassCard
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col gap-4 p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
                <p className="text-left text-sm leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <Badge key={tool} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
