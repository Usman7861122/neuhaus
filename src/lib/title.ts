/** Keep <title> tags at 60 characters or fewer so Google does not cut them off. */
export const MAX_TITLE = 60;
const SUFFIX = " | Neuhaus Foot & Ankle";

const tidy = (s: string) => s.replace(/\s+/g, " ").replace(/[\s,;:&\-–]+$/, "").replace(/\s+(and|&)$/i, "").trim();

const nameVariants = (name: string): string[] => {
  const noParens = name.replace(/\s*\([^)]*\)/g, "").trim();
  const noTail = noParens.replace(/\s+(of|in|affecting)\s+the\s+.*$/i, "").replace(/,?\s+including\s+.*$/i, "");
  const out = [name, noParens, noTail, noParens.split(":")[0], noParens.split(",")[0], noParens.split(/ and /)[0], noParens.split(/ & | and /)[0]];
  return [...new Set(out.map(tidy).filter((v) => v.length >= 6))];
};

export function fitTitle(raw: string, max = MAX_TITLE): string {
  let t = raw.replace(/\s+/g, " ").trim();
  if (t.length <= max) return enrich(t);
  if (t.endsWith(SUFFIX)) t = t.slice(0, -SUFFIX.length);
  if (t.length <= max) return t;

  // "<Name> Treatment in <City>, TN": shorten the name, keep the city.
  const m = t.match(/^(.*?)(?: Treatment)? in ([^,|]+), TN$/);
  if (m) {
    for (const v of nameVariants(m[1])) {
      for (const cand of [`${v} Treatment in ${m[2]}, TN`, `${v} in ${m[2]}, TN`]) if (cand.length <= max) return cand;
    }
    // Last resort: always keep the city, cut the name.
    const room = max - ` in ${m[2]}, TN`.length;
    const cut = m[1].slice(0, room);
    return `${tidy(cut.slice(0, cut.lastIndexOf(" ")))} in ${m[2]}, TN`;
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
  if (best >= 40) return enrich(tidy(t.slice(0, best)));
  // No good break: cut at a word, and never end on a filler word.
  const cut = t.slice(0, max);
  const words = cut.slice(0, cut.lastIndexOf(" ")).split(" ");
  while (words.length > 3 && /^(to|a|an|of|the|and|or|for|in|on|with|your|you|that|is)$/i.test(words[words.length - 1])) words.pop();
  return enrich(tidy(words.join(" ")));
}

/** Titles under 45 characters get the brand added when it fits, so they say more. */
export function enrich(t: string): string {
  return t.length < 45 && !/neuhaus/i.test(t) && (t + SUFFIX).length <= MAX_TITLE ? t + SUFFIX : t;
}
