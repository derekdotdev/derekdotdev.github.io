import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, normalize, resolve } from "node:path";

const DIST_DIR = resolve("dist");
const URL_PATTERN = /(?:href|src)=["']([^"']+)["']/g;

function getHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? getHtmlFiles(path) : path.endsWith(".html") ? [path] : [];
  });
}

function isInternalUrl(url) {
  return url.startsWith("/") && !url.startsWith("//");
}

function getTargetPath(url) {
  const pathname = decodeURIComponent(url.split(/[?#]/, 1)[0]);
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const target = join(DIST_DIR, relativePath);

  if (existsSync(target) && statSync(target).isFile()) return target;
  if (existsSync(join(target, "index.html"))) return join(target, "index.html");
  return normalize(target);
}

function collectBrokenLinks() {
  return getHtmlFiles(DIST_DIR).flatMap((file) => {
    const html = readFileSync(file, "utf8");
    return [...html.matchAll(URL_PATTERN)]
      .map((match) => match[1])
      .filter(isInternalUrl)
      .filter((url) => !existsSync(getTargetPath(url)))
      .map((url) => ({ file, url }));
  });
}

if (!existsSync(DIST_DIR)) {
  console.error("dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const brokenLinks = collectBrokenLinks();

if (brokenLinks.length > 0) {
  console.error("Broken internal links found:");
  brokenLinks.forEach(({ file, url }) => console.error(`- ${file}: ${url}`));
  process.exit(1);
}

console.log(`Checked internal links in ${getHtmlFiles(DIST_DIR).length} HTML files.`);
