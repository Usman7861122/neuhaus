import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    image: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    short: z.string().optional(),
    groups: z.array(z.object({ label: z.string().nullable().default(null), items: z.array(z.string()) })).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    image: z.string(),
    category: z.string(),
    readTime: z.string(),
    // Optional extras used for SEO and AI answers (FAQ markup, citations, topic)
    updated: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    topic: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.string() })).default([]),
  }),
});

export const collections = { services, blog };
