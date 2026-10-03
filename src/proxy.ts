import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const nextUrl = request.nextUrl;

  if (nextUrl.pathname === "/@vite/client") {
    return new NextResponse("", {
      status: 200,
      headers: {
        "content-type": "application/javascript; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  if (nextUrl.searchParams.has("ide_webview_request_time")) {
    nextUrl.searchParams.delete("ide_webview_request_time");
    return NextResponse.redirect(nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Only the two IDE-preview requests handled above. A page-path matcher ran
  // this ahead of every page view on Vercel, so even a static "/" paid for a
  // function invocation before the CDN could answer.
  matcher: [
    "/@vite/client",
    {
      source: "/:path*",
      has: [{ type: "query", key: "ide_webview_request_time" }],
    },
  ],
};
