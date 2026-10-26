// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.neufoot.com",
  integrations: [
    react(),
    // Keep redirect-only pages out of the sitemap.
    sitemap({ filter: (page) => !/\/(about|contact|insurance|conditions)\/?$/.test(new URL(page).pathname) }),
  ],
  vite: { plugins: [tailwindcss()] },
  image: { domains: ["images.unsplash.com"] },
});
