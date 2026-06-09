import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import Button from "./ui/Button";
import { site } from "@/lib/site";
import { pizzaFrames, FRAME_COUNT } from "@/assets/pizza/frames";

const LAST = FRAME_COUNT - 1;
// Point at which the slice is fully lifted. The remaining scroll is a short held
// beat that keeps the last frame on screen before the page scrolls on.
const LIFT_END = 0.82;

/**
 * Scroll-driven hero. The clip (a real margherita whose slice is pulled up, the
 * cheese stretching) was cut into 120 frames; the visitor's scroll is mapped to
 * a fractional frame index and painted to a <canvas>. Two adjacent frames are
 * cross-blended by the fractional part, so the lift reads as continuous video —
 * not a discrete frame step — exactly in step with the scroll.
 */
export default function PizzaScroll() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const ok = (img?: HTMLImageElement) =>
    !!img && img.complete && img.naturalWidth > 0;

  // Paint a *fractional* frame: draw the lower frame, then the upper frame on
  // top at alpha = frac. The blend is what removes the step between frames.
  const draw = (v: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const lo = Math.max(0, Math.min(LAST, Math.floor(v)));
    const hi = Math.min(LAST, lo + 1);
    const frac = v - lo;
    const imgLo = imagesRef.current[lo];
    if (!ok(imgLo)) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (canvas.width !== imgLo.naturalWidth) {
      canvas.width = imgLo.naturalWidth;
      canvas.height = imgLo.naturalHeight;
    }
    ctx.globalAlpha = 1;
    ctx.drawImage(imgLo, 0, 0, canvas.width, canvas.height);
    const imgHi = imagesRef.current[hi];
    if (frac > 0.001 && ok(imgHi)) {
      ctx.globalAlpha = frac;
      ctx.drawImage(imgHi, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    }
  };

  // Preload every frame in the background so scrubbing rarely waits on the
  // network. No blocking loader: the opening frame is painted the moment it
  // lands, and draw() simply holds the last frame if a later one isn't ready.
  useEffect(() => {
    let alive = true;
    const imgs = pizzaFrames.map((src, idx) => {
      const img = new Image();
      const done = () => {
        if (!alive) return;
        if (idx === 0) draw(0); // paint the opening frame as soon as it lands
      };
      img.onload = done;
      img.onerror = done;
      img.src = src;
      return img;
    });
    imagesRef.current = imgs;
    return () => {
      alive = false;
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Smooth the chunky wheel / trackpad scroll into a continuous value, then map
  // it to a fractional frame index. The spring turns discrete scroll steps into
  // a fluid glide; the cross-blend in draw() turns it into video.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
    restDelta: 0.00005,
  });
  const frameValue = useTransform(smoothProgress, [0, LIFT_END], [0, LAST], {
    clamp: true,
  });

  useMotionValueEvent(frameValue, "change", (v) => draw(v));

  // The pizza on the right gets a subtle zoom as the slice lifts; the scroll
  // hint fades the moment the visitor starts scrolling.
  const pizzaScale = useTransform(scrollYProgress, [0, LIFT_END], [0.95, 1.05]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={trackRef} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow blur-2xl" />
          <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-terracotta-600/15 blur-[120px]" />
          <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-gold-500/10 blur-[120px]" />
        </div>

        <div className="container-px mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* LEFT — text + CTAs (always present) */}
          <div className="z-20 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-gold-300/90">
              <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
              Pizzeria napoletana · depuis {site.foundedYear}
            </span>

            <h1 className="mt-6 font-serif text-5xl leading-[1.04] text-cream sm:text-6xl lg:text-7xl">
              Le feu vivant de{" "}
              <span className="text-gradient-warm italic">Naples</span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-cream/65 lg:mx-0">
              Pâte maturée 48 heures, four à bois à 480°C, produits DOP de
              Campanie. La pizza napolitaine, sans compromis.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button to="/menu" size="lg">
                Découvrir nos pizzas
              </Button>
              <Button to="/reservation" variant="outline" size="lg">
                Réserver une place
              </Button>
            </div>

            {/* Scroll hint */}
            <motion.div
              style={{ opacity: hintOpacity }}
              className="pointer-events-none mt-12 flex items-center justify-center gap-3 text-cream/55 lg:justify-start"
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              <span className="text-xs uppercase tracking-[0.3em]">
                Défilez pour soulever la part
              </span>
            </motion.div>
          </div>

          {/* RIGHT — scrubbed frame sequence */}
          <motion.div
            style={{ scale: pizzaScale }}
            className="relative mx-auto w-full max-w-[640px]"
          >
            <div className="pizza-mask-hero relative aspect-video">
              <canvas
                ref={canvasRef}
                className="h-full w-full object-cover"
                aria-label="Part de pizza margherita que l'on soulève, le fromage s'étire"
                role="img"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
