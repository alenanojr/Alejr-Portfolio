import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AchievementCard } from "@/components/common/AchievementCard";

export function Achievements() {
  return (
    <section id="achievements" className="pt-12 pb-8 sm:pt-12 sm:pb-8">
      <div className="container-px mx-auto max-w-4xl">
        <SectionHeading eyebrow="Achievements" title="Achievements" />

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
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
