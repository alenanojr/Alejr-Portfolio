import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AchievementCard } from "@/components/common/AchievementCard";

export function Achievements() {
  return (
    <section
      id="achievements"
      className="scroll-mt-12 pt-6 pb-9 sm:pt-12 sm:pb-8"
    >
      <div className="container-px mx-auto max-w-4xl">
        <SectionHeading eyebrow="Achievements" title="Achievements" />

        <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-2">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
