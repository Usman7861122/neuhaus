// Post-build clean-up for the static site. Every step is defensive: it never fails the build.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

/** /blog -> /blog/ (keeps ?query and #hash). Leaves files (.jpg, .xml) and external links alone. */
export function slashPath(href) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const m = href.match(/^([^?#]*)(.*)$/);
  const base = m[1];
  if (base === "/" || base.endsWith("/") || /\.[a-z0-9]{2,5}$/i.test(base)) return href;
  return base + "/" + m[2];
}

export default function postBuild() {
  return {
    name: "neufoot-post-build",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const root = fileURLToPath(dir);
        let files = 0, links = 0;
        try {
          for await (const f of walk(root)) {
            if (!f.endsWith(".html")) continue;
            const html = await readFile(f, "utf8");
            const out = html.replace(/(<a\b[^>]*?\shref=")(\/[^"]*)(")/g, (all, a, h, c) => {
              const n = slashPath(h);
              if (n !== h) links++;
              return a + n + c;
            });
            if (out !== html) { await writeFile(f, out); files++; }
          }
          console.log(`[post-build] trailing slashes added to ${links} links in ${files} pages`);
        } catch (e) {
          console.warn("[post-build] link step skipped:", e?.message);
        }


        // Build checks: every city page title must contain its city, and no title may pass 60 characters.
        try {
          let bad = [], long = 0;
          for await (const f of walk(root)) {
            if (!f.endsWith("index.html")) continue;
            const rel = path.relative(root, f).split(path.sep);
            const h = await readFile(f, "utf8");
            const t = (h.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
            if (t.length > 60) long++;
            if ((rel[0] === "conditions" || rel[0] === "services") && rel.length === 4) {
              const city = rel[2].replace(/-/g, " ");
              if (!t.toLowerCase().includes(city)) bad.push(`/${rel.slice(0, 3).join("/")}/ -> ${t}`);
            }
          }
          if (long) console.warn(`[post-build] WARNING: ${long} page titles are over 60 characters`);
          if (bad.length) console.warn(`[post-build] WARNING: ${bad.length} city page titles are missing the city name, e.g. ${bad.slice(0, 3).join(" | ")}`);
          if (!long && !bad.length) console.log("[post-build] title check passed (all titles <= 60, all city pages name their city)");
        } catch (e) { console.warn("[post-build] title check skipped:", e?.message); }

        // Images: add width/height (stops layout shift) and serve WebP copies of local JPG/PNG photos.
        try {
          let sharp;
          try { sharp = (await import("sharp")).default; } catch { sharp = null; }
          if (!sharp) { console.warn("[post-build] sharp not found, image step skipped"); return; }
          const meta = new Map(); // src -> { w, h, webp }
          const prep = async (src) => {
            if (meta.has(src)) return meta.get(src);
            let info = null;
            try {
              const file = path.join(root, src.split("?")[0]);
              const m = await sharp(file).metadata();
              info = { w: m.width, h: m.height, webp: null };
              if (/\.(jpe?g|png)$/i.test(file)) {
                const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
                try { await readFile(out); } catch { await sharp(file).webp({ quality: 78, effort: 4 }).toFile(out); }
                info.webp = src.replace(/\.(jpe?g|png)$/i, ".webp");
              }
            } catch {}
            meta.set(src, info);
            return info;
          };

          // Responsive copies of the big local photos (-lg.webp) so phones do not download 2000px images.
          const variantCache = new Map();
          const variants = async (src, info) => {
            if (variantCache.has(src)) return variantCache.get(src);
            const out = [];
            try {
              const file = path.join(root, src.split("?")[0]);
              for (const w of [640, 1024, 1600]) {
                if (w >= info.w) continue;
                const vsrc = src.replace(/\.webp$/i, `-w${w}.webp`);
                const vfile = path.join(root, vsrc);
                try { await readFile(vfile); } catch { await sharp(file).resize({ width: w }).webp({ quality: 74, effort: 4 }).toFile(vfile); }
                out.push([vsrc, w]);
              }
              out.push([src, info.w]);
            } catch {}
            variantCache.set(src, out);
            return out;
          };
          // Old-host (patientpop) photos: save a local, smaller WebP copy with real width and height.
          const remoteCache = new Map();
          const remote = async (url) => {
            if (remoteCache.has(url)) return remoteCache.get(url);
            let res = null;
            try {
              const { createHash } = await import("node:crypto");
              const { mkdir } = await import("node:fs/promises");
              const id = createHash("sha1").update(url).digest("hex").slice(0, 10);
              const dir = path.join(root, "images", "remote");
              await mkdir(dir, { recursive: true });
              const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
              if (r.ok) {
                const buf = Buffer.from(await r.arrayBuffer());
                const img = sharp(buf);
                const m = await img.metadata();
                const w1 = Math.min(m.width, 1200), w2 = Math.min(m.width, 600);
                const h1 = Math.round((m.height * w1) / m.width);
                await sharp(buf).resize({ width: w1, withoutEnlargement: true }).webp({ quality: 74, effort: 4 }).toFile(path.join(dir, `${id}-1200.webp`));
                await sharp(buf).resize({ width: w2, withoutEnlargement: true }).webp({ quality: 72, effort: 4 }).toFile(path.join(dir, `${id}-600.webp`));
                res = { big: `/images/remote/${id}-1200.webp`, small: `/images/remote/${id}-600.webp`, w1, w2, h1 };
              }
            } catch {}
            remoteCache.set(url, res);
            return res;
          };
          const pool = async (items, n, fn) => { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) await fn(items[i++]); })); };
          // Fetch all old-host photos first, 8 at a time.
          const remoteUrls = new Set();
          for await (const f of walk(root)) {
            if (!f.endsWith(".html")) continue;
            for (const m of (await readFile(f, "utf8")).matchAll(/<img\b[^>]*\ssrc="(https:\/\/sa1s3optim\.patientpop\.com\/[^"]+)"/g)) remoteUrls.add(m[1]);
          }
          await pool([...remoteUrls], 8, remote);
          let imgs = 0, withDims = 0;
          for await (const f of walk(root)) {
            if (!f.endsWith(".html")) continue;
            let html = await readFile(f, "utf8");
            const tags = [...new Set(html.match(/<img\b[^>]*>/g) ?? [])];
            let changed = false;
            let heroPreload = null;
            for (const tag of tags) {
              const rm = tag.match(/\ssrc="(https:\/\/sa1s3optim\.patientpop\.com\/[^"]+)"/);
              if (rm) {
                const r = remoteCache.get(rm[1]);
                if (!r) continue;
                const lazy = /\sloading="lazy"/.test(tag);
                const sizes = lazy ? "(min-width:1024px) 420px, 100vw" : "100vw";
                const srcset = `${r.small} ${r.w2}w, ${r.big} ${r.w1}w`;
                let t = tag.replace(rm[1], r.big).replace(/^<img\b/, `<img width="${r.w1}" height="${r.h1}" srcset="${srcset}" sizes="${sizes}" decoding="async"`);
                if (!lazy && /\salt="[^"]+"/.test(tag)) { t = t.replace(/^<img\b/, '<img fetchpriority="high"'); heroPreload ??= { srcset, sizes }; }
                html = html.split(tag).join(t); changed = true; imgs++; withDims++;
                continue;
              }
              const sm = tag.match(/\ssrc="(\/images\/[^"]+)"/);
              if (!sm) continue;
              const info = await prep(sm[1]);
              if (!info) continue;
              let t = tag;
              if (!/\swidth=/.test(t) && !/\sheight=/.test(t)) { t = t.replace(/^<img\b/, `<img width="${info.w}" height="${info.h}"`); withDims++; }
              if (!/\sdecoding=/.test(t) && !/fetchpriority="high"/.test(t)) t = t.replace(/^<img\b/, '<img decoding="async"');
              if (info.webp) t = t.replace(sm[1], info.webp);
              const finalSrc = info.webp ?? sm[1];
              if (/-lg\.webp$/.test(finalSrc) && !/\ssrcset=/.test(t)) {
                const vs = await variants(finalSrc, info);
                if (vs.length > 1) {
                  const lazy = /\sloading="lazy"/.test(t);
                  const sizes = lazy ? "(min-width:1024px) 600px, 100vw" : "100vw";
                  const srcset = vs.map(([u, w]) => `${u} ${w}w`).join(", ");
                  t = t.replace(/^<img\b/, `<img srcset="${srcset}" sizes="${sizes}"`);
                  if (!lazy && /\salt="[^"]+"/.test(t)) { t = t.replace(/^<img\b/, '<img fetchpriority="high"'); heroPreload ??= { srcset, sizes }; }
                }
              }
              const ss = t.match(/\ssrcset="([^"]+)"/);
              if (ss) {
                const parts = [];
                for (const part of ss[1].split(",")) {
                  const [u, ...rest] = part.trim().split(/\s+/);
                  const pi = u.startsWith("/images/") ? await prep(u) : null;
                  parts.push([pi?.webp ?? u, ...rest].join(" "));
                }
                t = t.replace(ss[0], ` srcset="${parts.join(", ")}"`);
              }
              if (t !== tag) { html = html.split(tag).join(t); changed = true; imgs++; }
            }
            if (heroPreload && !/rel="preload"[^>]*as="image"/.test(html) && !/as="image"[^>]*rel="preload"/.test(html)) {
              html = html.replace("</head>", `<link rel="preload" as="image" type="image/webp" imagesrcset="${heroPreload.srcset}" imagesizes="${heroPreload.sizes}" fetchpriority="high"></head>`);
              changed = true;
            }
            if (changed) await writeFile(f, html);
          }
          console.log(`[post-build] ${imgs} image tags updated (${withDims} got width/height), ${[...meta.values()].filter((m) => m?.webp).length} WebP copies`);
        } catch (e) {
          console.warn("[post-build] image step skipped:", e?.message);
        }
      },
    },
  };
}
