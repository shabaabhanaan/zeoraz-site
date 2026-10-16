import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)",
  ],
};

const RESERVED_SUBDOMAINS = new Set([
  "www",
  "api",
  "admin",
  "dashboard",
  "app",
  "mail",
  "auth",
  "cdn",
  "preview",
  "test",
  "staging",
  "status",
]);

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Normalize hostname (stripping port if present)
  const currentHost = hostname.split(":")[0].toLowerCase();

  // Root domain config
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  let rootDomain = "zeoraz.com";
  try {
    if (appUrl) {
      rootDomain = new URL(appUrl).hostname.replace(/^www\./, "");
    }
  } catch {
    // fallback
  }

  let subdomain: string | null = null;

  // 1. Localhost development handling (e.g. "brand.localhost:3000")
  if (currentHost.includes("localhost") || currentHost.includes("127.0.0.1")) {
    const parts = currentHost.split(".");
    if (parts.length > 1 && parts[0] !== "localhost" && parts[0] !== "127") {
      subdomain = parts[0];
    }
  }
  // 2. Production custom domain handling (e.g. "brand.zeoraz.com")
  else if (currentHost.endsWith(`.${rootDomain}`)) {
    const sub = currentHost.replace(`.${rootDomain}`, "");
    if (sub && !sub.includes(".")) {
      subdomain = sub;
    }
  }
  // 3. Vercel deployment preview handling (e.g. "brand---zeoraz.vercel.app")
  else if (currentHost.endsWith(".vercel.app")) {
    const parts = currentHost.split(".");
    if (parts.length > 3) {
      subdomain = parts[0];
    }
  }

  // If a valid merchant subdomain is accessed:
  if (subdomain && !RESERVED_SUBDOMAINS.has(subdomain)) {
    // Do not double-rewrite if already on /biz
    if (url.pathname.startsWith(`/biz/${subdomain}`)) {
      return NextResponse.next();
    }
    
    // Transparently rewrite root and nested paths to /biz/[subdomain]
    const rewritePath = url.pathname === "/" ? `/biz/${subdomain}` : `/biz/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(new URL(rewritePath, req.url));
  }

  return NextResponse.next();
}
