import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = { clinics: string[]; reasons: string[] };
type Errors = Partial<Record<"name" | "phone" | "email", string>>;

// Set PUBLIC_FORM_ENDPOINT in .env (Formspree, Netlify, your CRM, etc.) to receive submissions.
const ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined;

const field =
  "peer w-full border-0 border-b border-line bg-transparent px-0 pb-2.5 pt-6 text-[1rem] text-ink outline-none transition-colors placeholder-transparent focus:border-navy";
const label =
  "pointer-events-none absolute left-0 top-6 text-[0.95rem] text-slate transition-all peer-focus:top-0 peer-focus:text-[0.72rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-sky peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.72rem] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-sky";

export default function ContactForm({ clinics, reasons }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Enter your full name.";
    if (!/^[\d\s()+-]{7,}$/.test(data.phone ?? "")) next.phone = "Enter a phone number we can call.";
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Check the email address.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error();
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-10 text-center"
          role="status"
        >
          <p className="font-display text-4xl text-navy-900">Request received</p>
          <p className="mx-auto mt-4 max-w-sm text-slate">Our team will call you within one business day to confirm your appointment time.</p>
          <button type="button" onClick={() => setStatus("idle")} className="btn-outline mt-8">Send another request</button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="space-y-7">
          <div className="grid gap-7 sm:grid-cols-2">
            <div className="relative sm:col-span-2">
              <input id="f-name" name="name" placeholder="Full name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
              <label htmlFor="f-name" className={label}>Full name *</label>
              {errors.name && <p id="e-name" className="mt-2 text-sm text-red-700">{errors.name}</p>}
            </div>
            <div className="relative">
              <input id="f-phone" name="phone" type="tel" placeholder="Phone" autoComplete="tel" className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
              <label htmlFor="f-phone" className={label}>Phone *</label>
              {errors.phone && <p id="e-phone" className="mt-2 text-sm text-red-700">{errors.phone}</p>}
            </div>
            <div className="relative">
              <input id="f-email" name="email" type="email" placeholder="Email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
              <label htmlFor="f-email" className={label}>Email</label>
              {errors.email && <p id="e-email" className="mt-2 text-sm text-red-700">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="f-clinic" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-sky">Preferred clinic</label>
              <select id="f-clinic" name="clinic" className="mt-1 w-full border-0 border-b border-line bg-transparent py-2.5 text-ink outline-none focus:border-navy">
                <option value="">No preference</option>
                {clinics.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="f-reason" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-sky">Reason for visit</label>
              <select id="f-reason" name="reason" className="mt-1 w-full border-0 border-b border-line bg-transparent py-2.5 text-ink outline-none focus:border-navy">
                <option value="">Choose one</option>
                {reasons.map((r) => <option key={r}>{r}</option>)}
                <option>Something else</option>
              </select>
            </div>
            <div className="relative sm:col-span-2">
              <textarea id="f-msg" name="message" rows={3} placeholder="Message" className={`${field} resize-none`} />
              <label htmlFor="f-msg" className={label}>Anything we should know?</label>
            </div>
          </div>
          <p className="text-[0.82rem] text-slate">Please don't include private medical details here. We'll talk about those by phone.</p>
          {status === "error" && <p className="text-sm text-red-700" role="alert">We couldn't send your request. Please call us instead.</p>}
          <button type="submit" disabled={status === "sending"} className="btn-navy w-full sm:w-auto disabled:opacity-60">
            {status === "sending" ? "Sending..." : "Request an appointment"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
