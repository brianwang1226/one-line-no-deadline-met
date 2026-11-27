// One Line, No Deadline Met — make.fun entry.
// Writes one single-line joke excusing a missed deadline to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt). Deterministic, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = `I missed the deadline because I spent three days writing the perfect apology for missing it, and the apology is now three days late too.`;

// Kit gate: 1-200 UTF-8 chars, not only whitespace, exactly one sentence
// (one terminal period), and a single line — the judge scores the entry as
// one line, so a newline in it would break the form before judging starts.
// Fail loudly instead of writing an entry the judge would reject.
const len = [...ENTRY].length;
const terminals = (ENTRY.match(/[.!?]/g) ?? []).length;
const lines = ENTRY.split("\n").length;
if (len < 1 || len > 200 || ENTRY.trim().length === 0 || terminals !== 1 || lines !== 1) {
  console.error(`Entry rejected by local gate: ${len} chars, ${terminals} sentence terminators, ${lines} lines (must be 1-200 chars, non-blank, one sentence, one line).`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${[...ENTRY].length} characters to ${join(outDir, "entry.txt")}`);
