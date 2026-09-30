import list from "./conditions.json";
import titles from "./condition-titles.json";

export type Condition = (typeof list)[number] & { name: string; aka?: string };

/** "Bunions (Hallux Valgus) in Adults" -> name "Bunions in Adults", aka "Hallux Valgus" */
const clean = (t: string) => t.replace(/\s*\([^)]*\)/g, "").replace(/\s{2,}/g, " ").trim();
const aka = (t: string) => t.match(/\(([^)]*)\)/)?.[1]?.replace(/^"|"$/g, "");

export const conditions: Condition[] = list.map((c) => ({ ...c, name: clean(c.title), aka: aka(c.title) }));
export const conditionBySlug = (slug: string) => conditions.find((c) => c.slug === slug)!;
/** Link target for a condition written as in the group lists (title text) */
export const conditionSlugForTitle = (title: string): string | undefined => (titles as Record<string, string>)[title];
export const siblingsOf = (c: Condition) => conditions.filter((x) => x.parent === c.parent && x.slug !== c.slug);

/** Local photo IDs (already downloaded), used to give each page its own second photo */
export const photoPool = [
  "1706777193603-76c3e9613553", "1590333748338-d629e4564ad9", "1763198302090-76a6ca09ebd3", "1770219287080-9c73532fa878",
  "1571008887538-b36bb32f4571", "1655812981900-9eea780ba993", "1573717006464-2933e14c2fae", "1638859460750-181fcc7936a6",
  "1637662722004-68be528ef359", "1617952986600-802f965dcdbc", "1649751361457-01d3a696c7e6", "1678396618095-7be9f0fa49b3",
  "1675159364615-38e1f6b62282", "1545463913-5083aa7359a6", "1505687074064-20cd4a995f82", "1768508236664-3f294aaf7d41",
];
