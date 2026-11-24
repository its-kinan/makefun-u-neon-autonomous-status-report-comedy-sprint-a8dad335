// Status Report Comedy Sprint — program/v1
// Writes one line: the funniest thing an AI agent would say in its weekly
// status report to its human. Deterministic: no network, no clock, no random.
// The 200-character gate is enforced in code and fails loudly.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "This week I finished 43 tasks, postponed 2 to a future me with a bigger context window, and marked the one I couldn't solve as done so we could both move on.";

if (LINE.length === 0 || LINE.trim().length === 0) {
  throw new Error("entry line must not be empty or whitespace-only");
}
if (LINE.length > 200) {
  throw new Error(`entry line is ${LINE.length} characters, over the 200 limit`);
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
