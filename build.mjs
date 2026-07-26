#!/usr/bin/env node
// Otoro Club — static site assembler.
// No framework. Reads shared partials + per-page content fragments from src/,
// emits pure static HTML at the repo root so Vercel serves crawlable files with
// per-page <head> and shared nav/footer/notices that can never drift.
//
//   node build.mjs
//
// Page fragments live in src/pages/**.html and open with a <!--META … META-->
// JSON block. Everything after it is the page's <main> content.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, "src");
const PARTIALS = join(SRC, "partials");
const PAGES = join(SRC, "pages");

const partial = (name) => readFileSync(join(PARTIALS, name), "utf8");

// Substitute {{KEY}} tokens; unknown tokens collapse to "".
const fill = (tpl, vars) =>
  tpl.replace(/\{\{\s*([A-Z0-9_]+)\s*\}\}/g, (_, k) => (k in vars ? vars[k] : ""));

// Recursively collect *.html fragment paths under src/pages.
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (entry.endsWith(".html")) out.push(p);
  }
  return out;
}

const HEAD = partial("_head.html");
const UTILITY = partial("_utility.html");
const NAV = partial("_nav.html");
const NOTICES = partial("_notices.html");
const FOOTER = partial("_footer.html");
const COOKIE = partial("_cookie.html");
const GLOSSARY = partial("_glossary.html");
const SCRIPTS = partial("_scripts.html");

const SITE = "https://otoroclub.com";
const DEFAULT_OG = "/assets/og-image.jpg";

function parseMeta(raw, file) {
  const m = raw.match(/<!--META\s*([\s\S]*?)\s*META-->/);
  if (!m) throw new Error(`Missing <!--META … META--> block in ${file}`);
  let meta;
  try {
    meta = JSON.parse(m[1]);
  } catch (e) {
    throw new Error(`Bad JSON in META of ${file}: ${e.message}`);
  }
  const body = raw.slice(m.index + m[0].length).trim();
  return { meta, body };
}

const files = walk(PAGES);
const routes = [];

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const { meta, body } = parseMeta(raw, file);
  const path = meta.path ?? relative(PAGES, file).replace(/\.html$/, "");
  const outRel = path === "index" || path === "" ? "index.html" : `${path}.html`;
  const canonical = path === "index" ? `${SITE}/` : `${SITE}/${path}`;
  const jsonld = (meta.jsonld || [])
    .map((obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`)
    .join("\n");

  const head = fill(HEAD, {
    TITLE: meta.title,
    DESCRIPTION: meta.description,
    CANONICAL: canonical,
    OG_TITLE: meta.ogTitle || meta.title,
    OG_DESCRIPTION: meta.ogDescription || meta.description,
    OG_IMAGE: `${SITE}${meta.ogImage || DEFAULT_OG}`,
    OG_URL: canonical,
    EXTRA_HEAD: (meta.extraHead || "") + jsonld,
  });

  const doc = `<!doctype html>
<html lang="en">
<head>
${head}
</head>
<body${meta.bodyClass ? ` class="${meta.bodyClass}"` : ""} id="top">
${UTILITY}
${NAV}
${body}
${meta.hideNotices ? "" : NOTICES}
${FOOTER}
${COOKIE}
${GLOSSARY}
${SCRIPTS}
</body>
</html>
`;

  const outPath = join(ROOT, outRel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, doc, "utf8");
  routes.push({ path, outRel, canonical, lastmod: meta.lastmod || "2026-07-24" });
}

// Sitemap
const urls = routes
  .map(
    (r) =>
      `  <url><loc>${r.canonical}</loc><lastmod>${r.lastmod}</lastmod></url>`
  )
  .join("\n");
writeFileSync(
  join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  "utf8"
);

console.log(`Built ${routes.length} routes + sitemap.xml`);
for (const r of routes.sort((a, b) => a.outRel.localeCompare(b.outRel)))
  console.log(`  /${r.path}  ->  ${r.outRel}`);
