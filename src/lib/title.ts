/** Keep <title> tags at 60 characters or fewer so Google does not cut them off. */
export const MAX_TITLE = 60;
const SUFFIX = " | Neuhaus Foot & Ankle";

const tidy = (s: string) => s.replace(/\s+/g, " ").replace(/[\s,;:&\-–]+$/, "").replace(/\s+(and|&)$/i, "").trim();

const nameVariants = (name: string): string[] => {
  const noParens = name.replace(/\s*\([^)]*\)/g, "").trim();
  const out = [name, noParens, noParens.split(":")[0], noParens.split(",")[0], noParens.split(/ & | and /)[0]];
  return [...new Set(out.map(tidy).filter((v) => v.length >= 6))];
};

export function fitTitle(raw: string, max = MAX_TITLE): string {
  let t = raw.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  if (t.endsWith(SUFFIX)) t = t.slice(0, -SUFFIX.length);
  if (t.length <= max) return t;

  // "<Name> Treatment in <City>, TN": shorten the name, keep the city.
  const m = t.match(/^(.*?)(?: Treatment)? in ([^,|]+), TN$/);
  if (m) {
    for (const v of nameVariants(m[1])) {
      for (const cand of [`${v} Treatment in ${m[2]}, TN`, `${v} in ${m[2]}, TN`]) if (cand.length <= max) return cand;
    }
  }

  // Generic: drop filler openings, then cut at the last natural break that fits.
  t = t.replace(/^(All About|Everything You Need to Know About|A Guide to)\s+/i, "");
  if (t.length <= max) return t;
  const seps = [", ", ": ", " – ", " - ", " | ", " and ", " & ", "? ", " or "];
  let best = -1;
  for (const s of seps) {
    let i = t.indexOf(s);
    while (i !== -1) {
      if (i <= max && i >= 24 && i > best) best = i;
      i = t.indexOf(s, i + 1);
    }
  }
  if (best > 0) return tidy(t.slice(0, best));
  const cut = t.slice(0, max);
  return tidy(cut.slice(0, cut.lastIndexOf(" ")));
}
