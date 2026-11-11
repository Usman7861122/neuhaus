// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { readdirSync, readFileSync } from "node:fs";
import postBuild from "./integrations/post-build.mjs";

// Real publish dates for blog posts, used as <lastmod> in the sitemap.
const blogDates = {};
try {
  for (const f of readdirSync("./src/content/blog")) {
    const m = readFileSync(`./src/content/blog/${f}`, "utf8").match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
    if (m) blogDates[f.replace(/\.md$/, "")] = m[1];
  }
} catch {}
const buildDate = new Date().toISOString();

export default defineConfig({
  site: "https://www.neufoot.com",
  trailingSlash: "always",
  integrations: [
    react(),
    // Keep redirect-only pages out of the sitemap.
    sitemap({
      filter: (page) => !/\/(contact|insurance|conditions)\/?$/.test(new URL(page).pathname),
      serialize(item) {
        const m = new URL(item.url).pathname.match(/^\/blog\/([^/]+)\/$/);
        item.lastmod = m && blogDates[m[1]] ? new Date(blogDates[m[1]]).toISOString() : buildDate;
        return item;
      },
    }),
    postBuild(),
  ],
  vite: { plugins: [tailwindcss()] },
  image: { domains: ["images.unsplash.com"] },
});
