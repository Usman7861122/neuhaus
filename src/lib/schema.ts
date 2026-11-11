const BASE = "https://www.neufoot.com";
type Crumb = { name: string; path: string };

export const breadcrumbs = (items: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: BASE + it.path })),
});

/** WebPage / CollectionPage / AboutPage etc. plus a breadcrumb trail. */
export const pageSchema = (type: string, name: string, path: string, description: string | undefined, crumbs: Crumb[]) => [
  {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url: BASE + path,
    ...(description ? { description } : {}),
    isPartOf: { "@type": "WebSite", name: "Neuhaus Foot & Ankle", url: BASE + "/" },
  },
  breadcrumbs(crumbs),
];
