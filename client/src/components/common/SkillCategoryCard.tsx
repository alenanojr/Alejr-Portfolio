import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { SkillCategory } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { Badge } from "@/components/ui/badge";

interface SkillCategoryCardProps {
  category: SkillCategory;
  icon: LucideIcon;
  index: number;
}

export function SkillCategoryCard({
  category,
  icon: Icon,
  index,
}: SkillCategoryCardProps) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      className="flex flex-col gap-4 p-6"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-semibold text-foreground">{category.title}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: skillIndex * 0.03 }}
          >
            <Badge variant="default">{skill}</Badge>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
