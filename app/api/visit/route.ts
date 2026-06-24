import { appendVisitorLog, getClientIp } from "@/lib/visitor-log";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const entry = await appendVisitorLog(ip);

    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    console.error("Failed to log visitor:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
