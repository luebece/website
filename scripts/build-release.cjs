const fs = require("fs");
const path = require("path");
const { zipSync } = require("fflate");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "dist");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "jeongcheogi-trainer.zip");
const RELEASE_ROOT = "jeongcheogi-trainer";
const RUNTIME_FILES = [
  "USAGE.txt",
  "index.html",
  "styles.css",
  "theory-deep.js",
  "theory-mega.js",
  "code-sql-mastery.js",
  "code-sql-conquest.js",
  "code-sql-grandmaster.js",
  "code-java-generics.js",
  "exam-master-theory.js",
  "exam-master-code-c.js",
  "exam-master-code-jps.js",
  "exam-master-academy.js",
  "exam-coverage.js",
  "answer-engine.js",
  "app.js",
  "pwa.js",
  "manifest.webmanifest",
  "sw.js",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

const entries = {};
for (const relativePath of RUNTIME_FILES) {
  const sourcePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing runtime file: ${relativePath}`);
  entries[`${RELEASE_ROOT}/${relativePath.replaceAll("\\", "/")}`] = fs.readFileSync(sourcePath);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, zipSync(entries, { level: 9 }));

console.log(
  JSON.stringify(
    {
      output: path.relative(ROOT, OUTPUT_FILE),
      files: RUNTIME_FILES.length,
      bytes: fs.statSync(OUTPUT_FILE).size,
      excludes: [".git", ".github", ".agents", ".codex", "node_modules", "tests"],
    },
    null,
    2,
  ),
);
