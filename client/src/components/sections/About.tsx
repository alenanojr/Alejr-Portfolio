import { motion } from "framer-motion";
import { about } from "@/data/about";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { ProfileCard } from "@/components/common/ProfileCard";
import { GlassCard } from "@/components/common/GlassCard";

export function About() {
  return (
    <section id="about" className="scroll-mt-12 pt-8 pb-8 sm:pt-12 sm:pb-8">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Me"
          title="Building software and IT solutions — for teams and clients"
        />

        <div className="mt-5 grid grid-cols-1 gap-8 sm:mt-8 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="flex flex-col gap-6">
            {about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-left text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {about.stats.map((stat, index) => (
                <GlassCard
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex flex-col items-center gap-1 p-5 text-center"
                >
                  <span className="text-3xl font-semibold text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  );
}
