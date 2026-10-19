import { execFileSync } from "node:child_process";

const releaseMode = process.argv.includes("--release");

function git(args, options = {}) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      ...options,
    }).trim();
  } catch (error) {
    if (options.allowFailure) return null;
    const detail = error.stderr?.toString().trim() || error.message;
    throw new Error(`git ${args.join(" ")} fehlgeschlagen: ${detail}`);
  }
}

const repositoryRoot = git(["rev-parse", "--show-toplevel"]);
const branch = git(["symbolic-ref", "--quiet", "--short", "HEAD"], {
  allowFailure: true,
});
const head = git(["rev-parse", "--verify", "HEAD"]);
const status = git(["status", "--porcelain=v1"]);
const upstream = git(
  ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"],
  { allowFailure: true },
);

let ahead = null;
let behind = null;
if (upstream) {
  const relation = git([
    "rev-list",
    "--left-right",
    "--count",
    `${upstream}...HEAD`,
  ]).split(/\s+/);
  [behind, ahead] = relation.map(Number);
}

console.log(`Repository: ${repositoryRoot}`);
console.log(`Branch: ${branch ?? "detached HEAD"}`);
console.log(`Commit: ${head}`);
console.log(`Arbeitsverzeichnis: ${status ? "offene Änderungen" : "sauber"}`);
console.log(
  `Upstream: ${upstream ?? "nicht gesetzt"}${
    upstream ? ` (${ahead} voraus, ${behind} zurück)` : ""
  }`,
);

if (!releaseMode) {
  if (branch === "main") {
    console.log(
      "Hinweis: Für Änderungen einen eigenen codex/<rechner>/<thema>-Branch oder Worktree verwenden.",
    );
  }
  process.exit(0);
}

const failures = [];
if (branch !== "main") failures.push("HEAD liegt nicht auf main");
if (status) failures.push("das Arbeitsverzeichnis enthält offene Änderungen");
if (upstream !== "origin/main") failures.push("main verfolgt nicht origin/main");
if (ahead !== 0 || behind !== 0) {
  failures.push("main und der lokal bekannte origin/main-Stand sind nicht identisch");
}

if (failures.length) {
  console.error("Veröffentlichung blockiert:");
  for (const failure of failures) console.error(`- ${failure}`);
  console.error(
    "Rufe origin/main mit einer kurzlebigen Sites-Berechtigung ab, integriere und prüfe erneut.",
  );
  process.exit(1);
}

console.log(
  "Release-Prüfung bestanden. Der lokal bekannte main-Stand ist sauber und vollständig übertragen.",
);
