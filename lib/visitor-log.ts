import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import type { VisitorEntry, VisitorVisitData } from "@/lib/visitor-meta";

export type { VisitorEntry, VisitorVisitData };

const LOG_FILE = path.join(process.cwd(), "data", "visitor-log.json");
const BLOB_PATHNAME = "data/visitor-log.json";

export function shouldUseBlobStorage(): boolean {
  return (
    Boolean(process.env.BLOB_READ_WRITE_TOKEN) ||
    Boolean(process.env.BLOB_STORE_ID) ||
    process.env.VERCEL === "1"
  );
}

async function readFromFile(): Promise<VisitorEntry[]> {
  try {
    const raw = await fs.readFile(LOG_FILE, "utf8");
    const entries = JSON.parse(raw) as VisitorEntry[];
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

async function writeToFile(entries: VisitorEntry[]): Promise<void> {
  await fs.writeFile(
    LOG_FILE,
    `${JSON.stringify(entries, null, 2)}\n`,
    "utf8",
  );
}

async function readFromBlob(): Promise<VisitorEntry[]> {
  try {
    const result = await get(BLOB_PATHNAME, {
      access: "private",
      useCache: false,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return [];
    }

    const raw = await new Response(result.stream).text();
    const entries = JSON.parse(raw) as VisitorEntry[];
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

async function writeToBlob(entries: VisitorEntry[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function readEntries(source: "blob" | "file"): Promise<VisitorEntry[]> {
  const raw =
    source === "blob" ? await readFromBlob() : await readFromFile();
  return raw.map(normalizeEntry);
}

function normalizeEntry(entry: VisitorEntry & { timestamp?: string }): VisitorEntry {
  const { timestamp, ...rest } = entry;

  return {
    ...rest,
    lastVisited: entry.lastVisited ?? timestamp ?? new Date().toISOString(),
    visit_count: entry.visit_count ?? 1,
  };
}

export async function appendVisitorLog(
  data: VisitorVisitData,
): Promise<VisitorEntry> {
  const now = new Date().toISOString();
  const blobEnabled = shouldUseBlobStorage();
  const entries = blobEnabled
    ? await readEntries("blob")
    : await readEntries("file");

  const existingIndex = entries.findIndex((entry) => entry.ip === data.ip);

  if (existingIndex >= 0) {
    const existing = entries[existingIndex];
    const updated: VisitorEntry = {
      ...existing,
      ...data,
      visit_count: existing.visit_count + 1,
      lastVisited: now,
    };

    entries[existingIndex] = updated;

    if (blobEnabled) {
      await writeToBlob(entries);
    } else {
      await writeToFile(entries);
    }

    return updated;
  }

  const entry: VisitorEntry = {
    ...data,
    visit_count: 1,
    lastVisited: now,
  };

  entries.push(entry);

  if (blobEnabled) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }

  return entry;
}
