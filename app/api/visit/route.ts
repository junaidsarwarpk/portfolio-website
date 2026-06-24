import { appendVisitorLog, getClientIp } from "@/lib/visitor-log";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const entry = await appendVisitorLog(ip);

    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to log visitor:", message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
