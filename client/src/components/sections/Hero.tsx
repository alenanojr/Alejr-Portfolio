import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, FolderGit2, User } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";
import { TypingText } from "@/components/common/TypingText";
import { MagneticButton } from "@/components/common/MagneticButton";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { SocialIcons } from "@/components/common/SocialIcons";
import { Button } from "@/components/ui/button";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
};

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updateTouchMode = () => setIsTouchDevice(mediaQuery.matches || navigator.maxTouchPoints > 0);

    updateTouchMode();
    mediaQuery.addEventListener("change", updateTouchMode);

    return () => mediaQuery.removeEventListener("change", updateTouchMode);
  }, []);

  const isSunglassesVisible = isTouchDevice ? isTapped : isHovered;

  const handlePortraitPointerEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handlePortraitPointerLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
    }
  };

  const handlePortraitToggle = () => {
    if (isTouchDevice) {
      setIsTapped((prev) => !prev);
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[80vh] items-center overflow-hidden py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="container-px mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-start gap-6 text-left">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg text-muted-foreground"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {personalInfo.fullName}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="flex min-h-10 items-center text-xl font-medium text-foreground sm:text-2xl"
          >
            <TypingText words={personalInfo.roles} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="max-w-xl text-sm leading-relaxed text-justify text-muted-foreground sm:text-lg"
          >
            {personalInfo.introduction}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton>
              <Button asChild size="lg">
                <a href={personalInfo.resumeUrl} download>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("projects")}
              >
                <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                View My Projects
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.5}>
            <SocialIcons />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative order-first flex justify-center lg:order-last"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 20%, transparent), transparent)",
            }}
          />
          <button
            type="button"
            onPointerEnter={handlePortraitPointerEnter}
            onPointerLeave={handlePortraitPointerLeave}
            onMouseEnter={handlePortraitPointerEnter}
            onMouseLeave={handlePortraitPointerLeave}
            onClick={handlePortraitToggle}
            onKeyDown={(event) => {
              if ((event.key === "Enter" || event.key === " ") && isTouchDevice) {
                event.preventDefault();
                handlePortraitToggle();
              }
            }}
            aria-label="Toggle sunglasses portrait"
            className="group rounded-full border-0 bg-transparent p-0 text-left transition-transform duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ImageWithFallback
              src={isSunglassesVisible ? "/images/with_sunglass.png" : "/images/without_sunglass.png"}
              alt={personalInfo.fullName}
              className="h-[320px] w-auto object-contain sm:h-[420px] lg:h-[520px]"
              fallback={
                <div className="flex h-[320px] w-[320px] flex-col items-center justify-center gap-3 rounded-full border border-dashed border-border text-muted-foreground sm:h-[420px] sm:w-[420px] lg:h-[480px] lg:w-[480px]">
                  <User className="h-16 w-16" aria-hidden="true" />
                  <span className="max-w-[70%] text-center text-xs">
                    Add a transparent PNG at /images/without_sunglass.png
                  </span>
                </div>
              }
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
