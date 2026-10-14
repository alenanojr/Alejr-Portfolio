import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const updateActiveSection = () => {
      const offset = 120;
      const sections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          return {
            id,
            top: rect.top,
            bottom: rect.bottom,
          };
        })
        .filter((section): section is { id: string; top: number; bottom: number } => section !== null);

      if (sections.length === 0) return;

      const visibleSections = sections.filter(
        (section) => section.bottom > offset && section.top <= offset + 80
      );

      const selected =
        visibleSections.sort((a, b) => Math.abs(a.top - offset) - Math.abs(b.top - offset))[0] ??
        sections.sort((a, b) => Math.abs(a.top - offset) - Math.abs(b.top - offset))[0];

      if (selected) {
        setActiveId(selected.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  return activeId;
}
