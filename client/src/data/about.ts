import type { AboutContent } from "@/types";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

export const about: AboutContent = {
  paragraphs: [
    "I'm a Bachelor of Science in Information Technology graduate with professional experience in software development, system administration, and enterprise application development. Beyond full-time roles, I also take on freelance projects — building custom systems and websites, plus remote tech support using tools like UltraViewer and AnyDesk.",
    "I enjoy creating efficient business solutions, improving workflows, maintaining IT systems, and continuously learning new technologies.",
    "My goal is to build software that creates real value for businesses and users.",
  ],
  stats: [
    { label: "Projects Developed", value: projects.length },
    {
      label: "Enterprise Systems",
      value: projects.filter((p) => p.category === "Enterprise System").length,
    },
    {
      label: "Programming Languages",
      value:
        skillCategories.find((c) => c.id === "programming-languages")?.skills.length ?? 0,
    },
    { label: "Years of Experience", value: 1, suffix: "+" },
  ],
};
