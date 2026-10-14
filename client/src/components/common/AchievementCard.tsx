import { Award, Eye, ExternalLink } from "lucide-react";
import type { Achievement } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  const hasVisitLink = achievement.achievementUrl && achievement.achievementUrl !== "#";

  return (
    <GlassCard
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="flex flex-col overflow-hidden p-0"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <ImageWithFallback
          src={achievement.image}
          alt={`${achievement.title} achievement`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <Award className="h-8 w-8" aria-hidden="true" />
              <span className="text-xs">Achievement image coming soon</span>
            </div>
          }
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-base font-semibold text-foreground">{achievement.title}</h3>
        <p className="text-sm text-muted-foreground">
          {achievement.issuer} · {achievement.year}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-fit">
                <Eye className="h-4 w-4" aria-hidden="true" />
                View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{achievement.title}</DialogTitle>
                <DialogDescription>
                  {achievement.issuer} · {achievement.year}
                </DialogDescription>
              </DialogHeader>
              <ImageWithFallback
                src={achievement.image}
                alt={`${achievement.title} achievement`}
                className="w-full rounded-xl object-contain"
                fallback={
                  <div className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground">
                    <Award className="h-10 w-10" aria-hidden="true" />
                    <span className="text-xs">Achievement image coming soon</span>
                  </div>
                }
              />
            </DialogContent>
          </Dialog>

          {hasVisitLink && (
            <Button asChild variant="default" size="sm" className="w-fit">
              <a
                href={achievement.achievementUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Visit
              </a>
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
