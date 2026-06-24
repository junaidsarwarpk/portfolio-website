import { buildVisitorEntry } from "@/lib/visitor-meta";
import { appendVisitorLog } from "@/lib/visitor-log";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const entry = await appendVisitorLog(buildVisitorEntry(request));

    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to log visitor:", message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
