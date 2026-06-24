import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";

export type VisitorEntry = {
  ip: string;
  timestamp: string;
};

const LOG_FILE = path.join(process.cwd(), "data", "visitor-log.json");
const BLOB_PATHNAME = "data/visitor-log.json";

function isBlobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
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
}

async function writeToBlob(entries: VisitorEntry[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function appendVisitorLog(ip: string): Promise<VisitorEntry> {
  const entry: VisitorEntry = {
    ip,
    timestamp: new Date().toISOString(),
  };

  const blobEnabled = isBlobStorageEnabled();
  const entries = blobEnabled ? await readFromBlob() : await readFromFile();

  entries.push(entry);

  if (blobEnabled) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }

  return entry;
}
