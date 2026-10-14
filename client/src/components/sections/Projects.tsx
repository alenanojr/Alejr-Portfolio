import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "@/components/common/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="pt-12 pb-8 sm:pt-12 sm:pb-8">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected Work"
          description="Enterprise systems and applications I've designed and built to solve real operational problems."
        />

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
