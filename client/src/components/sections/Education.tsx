import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { GlassCard } from "@/components/common/GlassCard";
import { Badge } from "@/components/ui/badge";

export function Education() {
  return (
    <section id="education" className="pt-12 pb-8 sm:pt-12 sm:pb-8">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading eyebrow="Education" title="Academic Background" />

        <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="flex flex-col gap-4 p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Badge variant="accent">{education.status}</Badge>
                  {education.honor && <Badge variant="outline">{education.honor}</Badge>}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground">
                {education.school}
              </h3>
              <p className="text-sm font-medium text-accent">{education.degree}</p>
              <p className="text-sm text-muted-foreground">{education.period}</p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {education.description}
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <ImageWithFallback
              src={education.illustration}
              alt="Education illustration"
              className="w-full max-w-md"
              fallback={
                <div className="flex h-64 w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border text-muted-foreground">
                  <GraduationCap className="h-12 w-12" aria-hidden="true" />
                  <span className="max-w-[70%] text-center text-xs">
                    Add an illustration at /illustrations/education.svg
                  </span>
                </div>
              }
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
