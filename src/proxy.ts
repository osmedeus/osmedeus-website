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
  matcher: ["/:path*"],
};
