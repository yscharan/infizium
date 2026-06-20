import { NextRequest, NextResponse } from "next/server";

// ── In-memory rate limiter (per Vercel function instance) ──────────
// For production scale use Upstash Redis with @upstash/ratelimit
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

const ALLOWED_ORIGINS = [
  "https://infizium.com",
  "https://www.infizium.com",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  // ── Security headers on every response ──────────────────────────
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires these
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co https://api.resend.com",
      "frame-src 'self' https://www.google.com https://maps.google.com", // Google Maps embeds (school locations)
      "frame-ancestors 'none'",
    ].join("; ")
  );

  // ── CORS lockdown for API routes ─────────────────────────────────
  if (pathname.startsWith("/api/")) {
    const origin = req.headers.get("origin") ?? "";

    // Preflight
    if (req.method === "OPTIONS") {
      const preflightRes = new NextResponse(null, { status: 204 });
      if (ALLOWED_ORIGINS.includes(origin)) {
        preflightRes.headers.set("Access-Control-Allow-Origin", origin);
      }
      preflightRes.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      preflightRes.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      preflightRes.headers.set("Access-Control-Max-Age", "86400");
      return preflightRes;
    }

    // Set CORS header on actual requests
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }

    // ── Rate limiting on API routes ──────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // Stricter limit on auth endpoints (20 req / 15 min per IP)
    const isAuthRoute = pathname.startsWith("/api/auth/");
    const allowed = isAuthRoute
      ? rateLimit(ip, 20, 15 * 60 * 1000)
      : rateLimit(ip, 100, 60 * 1000);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please wait before trying again." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }
  }

  return res;
}

export const config = {
  matcher: [
    // Apply to all routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|icon.svg).*)",
  ],
};
