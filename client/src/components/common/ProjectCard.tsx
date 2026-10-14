import { ExternalLink, ImageIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="flex flex-col overflow-hidden p-0"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <ImageWithFallback
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon className="h-8 w-8" aria-hidden="true" />
              <span className="text-xs">Screenshot coming soon</span>
            </div>
          }
        />
        <Badge variant="accent" className="absolute left-3 top-3">
          {project.status}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {project.category}
        </span>
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-1 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              Code
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live Demo
            </a>
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
