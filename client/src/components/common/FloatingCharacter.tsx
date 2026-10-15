import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sits between Skills and Projects. GSAP drives the scroll-scrubbed
 * parallax/rotation/fade on the outer element; Framer Motion drives the
 * continuous float + mouse-tilt on the inner element — kept on separate
 * layers so the two transform sources never fight each other.
 */
export function FloatingCharacter() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 80, damping: 12 });
  const springRotateY = useSpring(rotateY, { stiffness: 80, damping: 12 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !outerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        outerRef.current,
        { yPercent: -35, rotate: -8, opacity: 0 },
        {
          yPercent: 35,
          rotate: 8,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.to(outerRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: outerRef.current,
          start: "bottom 15%",
          end: "bottom top",
          scrub: true,
        },
      });
    }, outerRef);

    return () => ctx.revert();
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
    rotateY.set(offsetX * 16);
    rotateX.set(offsetY * -16);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mx-auto h-48 max-w-6xl -translate-y-4 sm:h-64 md:h-72"
    >
      <div
        ref={outerRef}
        className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[65%]"
      >
        <motion.div
          ref={innerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: springRotateX, rotateY: springRotateY, perspective: 600 }}
          className="animate-float"
        >
          <ImageWithFallback
            src="/images/floating.png"
            alt=""
            className="h-36 w-36 object-contain drop-shadow-xl sm:h-48 sm:w-48 md:h-40 md:w-64"
            fallback={
              <div className="flex h-36 w-36 flex-col items-center justify-center gap-1 rounded-full border border-dashed border-border text-muted-foreground sm:h-48 sm:w-48 md:h-64 md:w-64">
                <Sparkles className="h-8 w-8 text-accent" aria-hidden="true" />
              </div>
            }
          />
        </motion.div>
      </div>
    </div>
  );
}
