// Links between blog posts and the condition / service pages, in both directions.
import { conditions } from "@/data/conditions";

type Post = { id: string; data: { title: string; excerpt: string; category: string; date: Date } };

const STOP = new Set(("a an and the of for to in on with your you our is are can how what why when do does it its or by at from this that these those " +
  "foot feet ankle ankles pain treatment treatments care problems problem tips signs symptoms causes guide best help helps ways way common " +
  "syndrome disorders disorder injuries injury chronic acute adults adult kids children child toe toes tendon tendons").split(" "));

const stem = (w: string) => w.replace(/'s$/, "").replace(/(ies)$/, "y").replace(/(es|s)$/, "");
export const tokens = (s: string) =>
  [...new Set(s.toLowerCase().replace(/[^a-z0-9\s'-]/g, " ").split(/[\s-]+/).map(stem).filter((w) => w.length > 2 && !STOP.has(w)))];

const condTokens = conditions.map((c) => ({ c, t: tokens(`${c.name} ${c.aka ?? ""}`) }));

const overlap = (a: string[], b: string[]) => a.filter((x) => b.includes(x)).length;

/** The condition page that best matches a post, or undefined when nothing fits. */
export function conditionForPost(post: Post) {
  const pt = tokens(post.data.title);
  let best: { c: (typeof conditions)[number]; s: number } | undefined;
  for (const { c, t } of condTokens) {
    const s = overlap(pt, t);
    if (s > (best?.s ?? 0)) best = { c, s };
  }
  return best?.c;
}

/** Up to 3 other posts on the same topic: shared keywords first, then same category, then the closest in date. */
export function relatedPosts(post: Post, all: Post[], n = 3) {
  const pt = tokens(post.data.title + " " + post.data.excerpt);
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      p,
      s: overlap(pt, tokens(p.data.title + " " + p.data.excerpt)) * 2 + (p.data.category === post.data.category ? 1 : 0),
      d: Math.abs(p.data.date.valueOf() - post.data.date.valueOf()),
    }))
    .sort((a, b) => b.s - a.s || a.d - b.d)
    .slice(0, n)
    .map((x) => x.p);
}

/** Posts for a condition or service page, matched on the title keywords. */
export function postsForTopic(topic: string, all: Post[], n = 3) {
  const tt = tokens(topic);
  return all
    .map((p) => ({ p, s: overlap(tt, tokens(p.data.title)) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || b.p.data.date.valueOf() - a.p.data.date.valueOf())
    .slice(0, n)
    .map((x) => x.p);
}
