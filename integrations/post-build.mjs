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
          let imgs = 0, withDims = 0;
          for await (const f of walk(root)) {
            if (!f.endsWith(".html")) continue;
            let html = await readFile(f, "utf8");
            const tags = [...new Set(html.match(/<img\b[^>]*>/g) ?? [])];
            let changed = false;
            for (const tag of tags) {
              const sm = tag.match(/\ssrc="(\/images\/[^"]+)"/);
              if (!sm) continue;
              const info = await prep(sm[1]);
              if (!info) continue;
              let t = tag;
              if (!/\swidth=/.test(t) && !/\sheight=/.test(t)) { t = t.replace(/^<img\b/, `<img width="${info.w}" height="${info.h}"`); withDims++; }
              if (!/\sdecoding=/.test(t) && !/fetchpriority="high"/.test(t)) t = t.replace(/^<img\b/, '<img decoding="async"');
              if (info.webp) t = t.replace(sm[1], info.webp);
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
