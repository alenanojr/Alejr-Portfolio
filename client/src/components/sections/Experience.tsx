import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TimelineItem } from "@/components/common/TimelineItem";

export function Experience() {
  return (
    <section id="experience" className="pt-12 pb-8 sm:pt-12 sm:pb-8">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading eyebrow="Experience" title="Professional Experience" />

        <div className="relative mt-8">
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2"
          />
          <div className="flex flex-col gap-14">
            {experience.map((entry, index) => (
              <TimelineItem key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
