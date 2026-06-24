import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import type { VisitorEntry } from "@/lib/visitor-meta";

export type { VisitorEntry };

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

export async function appendVisitorLog(
  data: Omit<VisitorEntry, "timestamp">,
): Promise<VisitorEntry> {
  const entry: VisitorEntry = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  const blobEnabled = shouldUseBlobStorage();
  const entries = blobEnabled ? await readFromBlob() : await readFromFile();

  entries.push(entry);

  if (blobEnabled) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }

  return entry;
}
