import { getCollection } from "astro:content";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = (await getCollection("blog")).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).slice(0, 50);
  const items = posts.map((p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>https://www.neufoot.com/blog/${p.id}/</link>
      <guid isPermaLink="true">https://www.neufoot.com/blog/${p.id}/</guid>
      <pubDate>${new Date(p.data.date).toUTCString()}</pubDate>
      <category>${esc(p.data.category)}</category>
      <description>${esc(p.data.excerpt)}</description>
    </item>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Neuhaus Foot &amp; Ankle Blog</title>
    <link>https://www.neufoot.com/blog/</link>
    <description>Foot and ankle health articles from Neuhaus Foot &amp; Ankle podiatrists in Middle Tennessee.</description>
    <language>en-us</language>
    <atom:link href="https://www.neufoot.com/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
