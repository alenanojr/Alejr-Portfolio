import { lazy, Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Workflow } from "@/components/sections/Workflow";
import { FloatingCharacter } from "@/components/common/FloatingCharacter";

const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({ default: m.Projects }))
);
const Achievements = lazy(() =>
  import("@/components/sections/Achievements").then((m) => ({ default: m.Achievements }))
);
const Gallery = lazy(() =>
  import("@/components/sections/Gallery").then((m) => ({ default: m.Gallery }))
);
const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact }))
);

function SectionFallback() {
  return <div className="h-96 w-full" aria-hidden="true" />;
}

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <FloatingCharacter />
      <Workflow />
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Achievements />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  );
}
