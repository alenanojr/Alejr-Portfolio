import { personalInfo } from "@/data/personalInfo";
import { SocialIcons } from "@/components/common/SocialIcons";

const QUICK_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-px mx-auto flex max-w-6xl flex-col items-center gap-4 py-8 text-center">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {personalInfo.fullName}
        </button>

        <nav aria-label="Quick navigation">
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {QUICK_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <SocialIcons />

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
