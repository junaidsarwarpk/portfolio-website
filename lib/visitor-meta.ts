import { UAParser } from "ua-parser-js";

export type VisitorEntry = {
  ip: string;
  lastVisited: string;
  visit_count: number;
  browser?: string;
  os?: string;
  device?: string;
  language?: string;
  referer?: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  userAgent?: string;
};

export type VisitorVisitData = Omit<VisitorEntry, "lastVisited" | "visit_count">;

const VISITOR_HEADER_PREFIX = "x-visitor-";

export function getClientIp(request: Request): string {
  const trustedIp = request.headers.get(`${VISITOR_HEADER_PREFIX}ip`);
  if (trustedIp) {
    return trustedIp;
  }

  const vercelForwarded = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) {
    return vercelForwarded.split(",")[0]?.trim() || "unknown";
  }

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

function headerOrForwarded(
  request: Request,
  name: string,
  vercelName?: string,
): string | undefined {
  const forwarded = request.headers.get(`${VISITOR_HEADER_PREFIX}${name}`);
  if (forwarded) {
    return forwarded;
  }

  if (vercelName) {
    const vercelValue = request.headers.get(vercelName);
    if (vercelValue) {
      return vercelValue;
    }
  }

  return undefined;
}

function formatBrowser(parser: InstanceType<typeof UAParser>): string | undefined {
  const browser = parser.getBrowser();
  if (!browser.name) {
    return undefined;
  }

  return browser.version
    ? `${browser.name} ${browser.version}`
    : browser.name;
}

function formatOs(parser: InstanceType<typeof UAParser>): string | undefined {
  const os = parser.getOS();
  if (!os.name) {
    return undefined;
  }

  return os.version ? `${os.name} ${os.version}` : os.name;
}

function formatDevice(parser: InstanceType<typeof UAParser>): string | undefined {
  const device = parser.getDevice();
  if (device.type) {
    return device.type;
  }

  if (device.vendor || device.model) {
    return [device.vendor, device.model].filter(Boolean).join(" ");
  }

  return "desktop";
}

export function buildVisitorEntry(request: Request): VisitorVisitData {
  const userAgent =
    headerOrForwarded(request, "user-agent") ??
    request.headers.get("user-agent") ??
    undefined;

  const parser = new UAParser(userAgent);

  return {
    ip: getClientIp(request),
    browser: formatBrowser(parser),
    os: formatOs(parser),
    device: formatDevice(parser),
    language: headerOrForwarded(request, "language") ??
      request.headers.get("accept-language")?.split(",")[0]?.trim(),
    referer: headerOrForwarded(request, "referer") ??
      request.headers.get("referer") ??
      undefined,
    country: headerOrForwarded(request, "country", "x-vercel-ip-country"),
    city: headerOrForwarded(request, "city", "x-vercel-ip-city"),
    region: headerOrForwarded(request, "region", "x-vercel-ip-country-region"),
    timezone: headerOrForwarded(request, "timezone", "x-vercel-ip-timezone"),
    userAgent,
  };
}

export function getVisitorForwardHeaders(request: Request): Headers {
  const headers = new Headers({ "content-type": "application/json" });

  const ip = getClientIp(request);
  headers.set(`${VISITOR_HEADER_PREFIX}ip`, ip);

  const userAgent = request.headers.get("user-agent");
  if (userAgent) {
    headers.set(`${VISITOR_HEADER_PREFIX}user-agent`, userAgent);
  }

  const language = request.headers.get("accept-language");
  if (language) {
    headers.set(`${VISITOR_HEADER_PREFIX}language`, language.split(",")[0]?.trim() ?? language);
  }

  const referer = request.headers.get("referer");
  if (referer) {
    headers.set(`${VISITOR_HEADER_PREFIX}referer`, referer);
  }

  for (const [source, target] of [
    ["x-vercel-ip-country", "country"],
    ["x-vercel-ip-city", "city"],
    ["x-vercel-ip-country-region", "region"],
    ["x-vercel-ip-timezone", "timezone"],
  ] as const) {
    const value = request.headers.get(source);
    if (value) {
      headers.set(`${VISITOR_HEADER_PREFIX}${target}`, value);
    }
  }

  return headers;
}
