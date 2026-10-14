import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { ImageIcon } from "lucide-react";
import { gallery } from "@/data/gallery";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AUTO_SPEED = 20; // px per second
const REPEAT_COUNT = 3; // cloned sets so the loop can drift either direction forever — 3 is enough, more just adds DOM weight

function GalleryImageFallback({ src }: { src: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-border text-muted-foreground">
      <ImageIcon className="h-8 w-8" aria-hidden="true" />
      <span className="max-w-[70%] text-center text-xs">Add a photo at {src}</span>
    </div>
  );
}

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const drag = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: false });
  const loopedGallery = Array.from({ length: REPEAT_COUNT }, () => gallery).flat();
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setWidth = track.scrollWidth / REPEAT_COUNT;
    // Tracked as our own float — reading position back from track.scrollLeft
    // would round to whole pixels each frame and silently drop the
    // sub-pixel-per-frame progress this slow a speed produces.
    let position = setWidth;
    track.scrollLeft = position;

    let lastTime = performance.now();
    let raf: number;

    function tick(now: number) {
      const dt = now - lastTime;
      lastTime = now;

      if (track) {
        if (pausedRef.current) {
          // Manual drag is driving track.scrollLeft directly — stay in sync
          // so autoplay resumes from here instead of snapping back.
          position = track.scrollLeft;
        } else {
          position += (AUTO_SPEED * dt) / 1000;
        }
        // Silently recenter once we drift a full set away — identical clones
        // make the jump invisible, which is what makes the loop endless.
        if (position < setWidth * 0.5) {
          position += setWidth;
        } else if (position > setWidth * 1.5) {
          position -= setWidth;
        }
        track.scrollLeft = position;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    pausedRef.current = true;
    drag.current = {
      isDown: true,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };
    // Pointer capture is deferred until real movement is confirmed below —
    // capturing immediately on every pointerdown redirects click resolution
    // to this container, which breaks plain clicks on the cards inside it.
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || !drag.current.isDown) return;
    const delta = event.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(delta) > 4) {
      drag.current.moved = true;
      track.setPointerCapture(event.pointerId);
    }
    if (drag.current.moved) {
      track.scrollLeft = drag.current.startScrollLeft - delta;
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
    drag.current.isDown = false;
    pausedRef.current = false;
  }

  function handleCardClick(event: MouseEvent<HTMLButtonElement>) {
    const track = trackRef.current;
    if (!track || !isMobile) {
      if (drag.current.moved) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }

    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const button = event.currentTarget;
    const currentIndex = Number(button.dataset.galleryIndex ?? 0);
    const nextIndex = ((currentIndex + 1) % gallery.length) + 1;
    const nextButton = track.querySelector<HTMLButtonElement>(`button[data-gallery-index="${nextIndex - 1}"]`);

    if (nextButton) {
      nextButton.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  return (
    <section id="gallery" className="overflow-hidden pt-12 pb-8 sm:pt-12 sm:pb-0">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading eyebrow="Gallery" title="A Look at My Activities" />
      </div>

      <div className="relative mt-8 [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="flex select-none gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden sm:px-8"
        >
          {loopedGallery.map((image, index) => {
            const galleryIndex = index % gallery.length;

            return (
              <Dialog key={`${image.id}-${index}`}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    aria-label={`View ${image.alt} enlarged`}
                    data-gallery-index={galleryIndex}
                    onClickCapture={handleCardClick}
                    className="aspect-[4/3] w-[180px] shrink-0 cursor-grab overflow-hidden rounded-2xl border border-border bg-card transition-opacity hover:opacity-90 active:cursor-grabbing sm:w-[240px]"
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover"
                      fallbackClassName="h-full w-full"
                      fallback={<GalleryImageFallback src={image.src} />}
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-xl border border-border bg-card p-3 shadow-xl sm:p-4">
                  <DialogHeader className="sr-only">
                    <DialogTitle>{image.alt}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
                      <ImageWithFallback
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover object-center"
                        fallbackClassName="h-full w-full"
                        fallback={<GalleryImageFallback src={image.src} />}
                      />
                    </div>
                    {image.caption ? (
                      <div className="px-1">
                        <p className="text-sm font-medium text-foreground">{image.alt}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{image.caption}</p>
                      </div>
                    ) : null}
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
}
