import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

type Item = { label: string; href: string; menu?: string; external?: boolean };
type Link = { label: string; href: string };

export default function MobileNav({
  items,
  groups,
  phone,
  phoneHref,
}: {
  items: Item[];
  groups: Record<string, Link[]>;
  phone: string;
  phoneHref: string;
}) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => { setOpen(false); setSection(null); };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="relative grid h-11 w-11 place-items-center rounded-full border border-current/25"
      >
        <span className="absolute h-px w-5 -translate-y-1 bg-current" />
        <span className="absolute h-px w-5 translate-y-1 bg-current" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ clipPath: "circle(0% at 100% 0%)" }}
                animate={{ clipPath: "circle(150% at 100% 0%)" }}
                exit={{ clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-navy-950 px-6 pb-10 pt-24 text-white"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
              >
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/30"
                >
                  <span className="absolute h-px w-5 rotate-45 bg-white" />
                  <span className="absolute h-px w-5 -rotate-45 bg-white" />
                </button>

                <nav aria-label="Mobile">
                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {items.map((item, i) => {
                      const sub = item.menu ? groups[item.menu] : undefined;
                      const isOpen = section === item.menu;
                      return (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 + i * 0.05, duration: 0.45 }}
                        >
                          {sub ? (
                            <>
                              <button
                                type="button"
                                aria-expanded={isOpen}
                                onClick={() => setSection(isOpen ? null : item.menu!)}
                                className="flex w-full items-center justify-between py-4 text-left font-display text-[1.9rem] leading-tight"
                              >
                                {item.label}
                                <svg className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180 text-gold" : ""}`} viewBox="0 0 10 6" aria-hidden="true">
                                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                </svg>
                              </button>
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className={`grid overflow-hidden ${item.menu === "practice" ? "grid-cols-1" : "grid-cols-2"} gap-x-4`}
                                  >
                                    {sub.map((l) => (
                                      <li key={l.href}>
                                        <a href={l.href} onClick={close} className="block py-2 text-[0.98rem] text-white/75 hover:text-gold">
                                          {l.label}
                                        </a>
                                      </li>
                                    ))}
                                    <li className="col-span-full h-4" aria-hidden="true" />
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <a
                              href={item.href}
                              onClick={close}
                              {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                              className="block py-4 font-display text-[1.9rem] leading-tight"
                            >
                              {item.label}
                            </a>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-auto space-y-3 pt-10">
                  <a href="/#contact" onClick={close} className="btn-gold w-full">Request an appointment</a>
                  <a href={phoneHref} className="btn-ghost w-full">Call {phone}</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
