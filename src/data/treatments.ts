import { locations, slugify } from "@/data/site";

/**
 * Which clinic offers which treatment.
 * By default EVERY clinic offers EVERY treatment. If a clinic does not offer one,
 * add its slug here, for example:  bunions: ["pulaski", "waverly"]
 * Each treatment + clinic pair becomes its own page: /services/bunions/brentwood
 */
export const notOffered: Record<string, string[]> = {
  // "bunions": ["pulaski"],
};

export const clinics = [...locations]
  .sort((a, b) => a.city.localeCompare(b.city))
  .map((l) => ({ ...l, slug: slugify(l.city) }));

export type Clinic = (typeof clinics)[number];

export const clinicsFor = (serviceId: string): Clinic[] =>
  clinics.filter((c) => !(notOffered[serviceId] ?? []).includes(c.slug));

export const treatmentsAt = <T extends { id: string }>(all: T[], clinicSlug: string): T[] =>
  all.filter((s) => !(notOffered[s.id] ?? []).includes(clinicSlug));

const km = (a: Clinic, b: Clinic) => {
  const r = Math.PI / 180;
  const x = (b.lng - a.lng) * r * Math.cos(((a.lat + b.lat) / 2) * r);
  const y = (b.lat - a.lat) * r;
  return Math.sqrt(x * x + y * y) * 6371;
};

export const nearest = (from: Clinic, list: Clinic[], n = 4) =>
  list.filter((c) => c.slug !== from.slug).sort((a, b) => km(from, a) - km(from, b)).slice(0, n);

export const miles = (a: Clinic, b: Clinic) => Math.round(km(a, b) * 0.621371);

/** Shared photo that shows care in the clinic */
export const consultPhoto = "1758691462858-f1286e5daf40";

/** A different second photo for each treatment page (Unsplash IDs already used on the site) */
export const accentPhoto: Record<string, string> = {
  "heel-achilles-arch-pain": "1763198302090-76a6ca09ebd3",
  "bunions-toes-forefoot": "1655812981900-9eea780ba993",
  "flat-feet-high-arches-alignment": "1768508236664-3f294aaf7d41",
  "ankle-pain-instability-tendons": "1580058572462-98e2c0e0e2f0",
  "foot-ankle-arthritis-joint-care": "1637662722004-68be528ef359",
  "fractures-trauma-sports-injuries": "1706777193603-76c3e9613553",
  "diabetic-foot-care-wounds-circulation": "1770219287080-9c73532fa878",
  "pediatric-foot-care": "1545463913-5083aa7359a6",
};
