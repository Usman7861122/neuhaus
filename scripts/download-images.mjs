/**
 * Downloads every Unsplash and PatientPop photo the site uses into /public/images,
 * so the website no longer depends on those outside links.
 *
 *   npm run images
 *
 * Safe to run again: files that already exist are skipped.
 */
import fs from "node:fs";
import path from "node:path";

const SRC = "src";
const PHOTOS = "public/images/photos";
const REMOTE = "public/images/remote";
fs.mkdirSync(PHOTOS, { recursive: true });
fs.mkdirSync(REMOTE, { recursive: true });

// 1. Find every image reference in the source files
const files = [];
const walk = (dir) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(astro|tsx?|md|mjs)$/.test(f.name)) files.push(p);
  }
};
walk(SRC);
const text = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");
const unsplashIds = [...new Set(text.match(/\b1\d{9,12}-[0-9a-f]{12}\b/g) || [])];
const ppPrefix = text.match(/https:\/\/sa1s3optim\.patientpop\.com\/assets\/production\/practices\/[0-9a-f]+\/images\//)?.[0];
const ppNames = [...new Set(text.match(/\b\d{6,8}\.(?:jpe?g|png)\b/g) || [])];

// 2. Download helper
const get = async (url, dest) => {
  if (fs.existsSync(dest)) return "skip";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return "ok";
};

const jobs = [];
for (const id of unsplashIds) {
  const base = `https://images.unsplash.com/photo-${id}?fm=jpg&fit=max`;
  jobs.push([`${base}&w=2000&q=80`, path.join(PHOTOS, `${id}-lg.jpg`)]);
  jobs.push([`${base}&w=700&q=75`, path.join(PHOTOS, `${id}-sm.jpg`)]);
}
if (ppPrefix) for (const n of ppNames) jobs.push([ppPrefix + n, path.join(REMOTE, n)]);

let ok = 0, skip = 0, failed = [];
for (const [url, dest] of jobs) {
  try {
    (await get(url, dest)) === "ok" ? ok++ : skip++;
    process.stdout.write(".");
  } catch (e) {
    failed.push(e.message);
    process.stdout.write("x");
  }
}
console.log(`\n\nDownloaded ${ok}, already had ${skip}, failed ${failed.length}.`);
if (failed.length) console.log("Failed:\n  " + failed.join("\n  "));
console.log("Photos are in public/images/photos and public/images/remote. The site now uses them automatically.");
