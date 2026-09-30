import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type T = { quote: string; name: string; source: string };

export default function TestimonialSlider({ items }: { items: T[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);


  const t = items[i];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, k) => (
          <svg key={k} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path fill="currentColor" d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z" />
          </svg>
        ))}
      </div>

      <div className="relative mt-8 min-h-[11rem] sm:min-h-[9rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-display text-[clamp(1.35rem,2.1vw,1.85rem)] font-medium leading-[1.3] text-navy-900">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 text-[0.95rem]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-semibold text-white">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="block text-sm text-slate">Review on {t.source}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-between gap-6 border-t border-line pt-6">
        <div className="flex gap-2">
          {items.map((_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Show review ${k + 1}`}
              aria-current={k === i}
              onClick={() => setI(k)}
              className="group grid h-8 place-items-center"
            >
              <span className={`block h-[3px] rounded-full transition-all duration-500 ${k === i ? "w-10 bg-navy" : "w-5 bg-line group-hover:bg-sky"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous review" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-line text-navy transition hover:border-navy hover:bg-navy hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
          </button>
          <button type="button" aria-label="Next review" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border border-line text-navy transition hover:border-navy hover:bg-navy hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
