import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "@/components/common/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-12 pt-6 pb-9 sm:pt-12 sm:pb-8">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected Work"
          description="Enterprise systems and applications I've designed and built to solve real operational problems."
        />

        <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
