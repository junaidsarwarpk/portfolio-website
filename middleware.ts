import { getVisitorForwardHeaders } from "@/lib/visitor-meta";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

function shouldLogVisit(request: NextRequest): boolean {
  if (request.method !== "GET") {
    return false;
  }

  if (request.headers.get("purpose") === "prefetch") {
    return false;
  }

  const accept = request.headers.get("accept") ?? "";
  return accept.includes("text/html");
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!shouldLogVisit(request)) {
    return NextResponse.next();
  }

  const visitUrl = new URL("/api/visit", request.nextUrl.origin);

  event.waitUntil(
    fetch(visitUrl, {
      method: "POST",
      headers: getVisitorForwardHeaders(request),
    }).catch(() => {}),
  );

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml|static).*)",
  ],
};
