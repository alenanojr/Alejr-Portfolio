import {
  Code2,
  LayoutGrid,
  Server,
  Database,
  Wrench,
  FileSpreadsheet,
  ShieldCheck,
  Cpu,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SkillCategoryCard } from "@/components/common/SkillCategoryCard";

const ICONS: Record<string, LucideIcon> = {
  "programming-languages": Code2,
  frontend: LayoutGrid,
  backend: Server,
  database: Database,
  "development-tools": Wrench,
  "office-productivity": FileSpreadsheet,
  "system-administration": ShieldCheck,
  "hardware-networking": Cpu,
  "ai-tools": Sparkles,
};

export function Skills() {
  return (
    <section id="skills" className="pt-12 pb-1 sm:pt-12 sm:pb-1">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          description="A well-rounded toolkit spanning development, infrastructure, and everyday productivity."
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.id}
              category={category}
              icon={ICONS[category.id] ?? Code2}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
