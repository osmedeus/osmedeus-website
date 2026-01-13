const DIST_DIR = `${process.cwd()}/dist`;

const runOk = (cmd) => {
  const result = Bun.spawnSync({
    cmd,
    stdout: "ignore",
    stderr: "ignore",
  });
  return result.exitCode === 0;
};

const fileExists = (path) => runOk(["test", "-e", path]);
const dirExists = (path) => runOk(["test", "-d", path]);

if (!dirExists(DIST_DIR)) {
  throw new Error(`Missing dist directory: ${DIST_DIR}. Run \`bun run build:dist\` first.`);
}

const contentTypeFromPath = (pathname) => {
  const ext = pathname.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "html":
      return "text/html; charset=utf-8";
    case "css":
      return "text/css; charset=utf-8";
    case "js":
      return "application/javascript; charset=utf-8";
    case "json":
      return "application/json; charset=utf-8";
    case "svg":
      return "image/svg+xml";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "ico":
      return "image/x-icon";
    case "woff":
      return "font/woff";
    case "woff2":
      return "font/woff2";
    case "txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
};

const safeJoin = (root, pathname) => {
  const normalized = pathname.replace(/\\/g, "/");
  const withoutQuery = normalized.split("?")[0] ?? "/";
  const withoutHash = withoutQuery.split("#")[0] ?? "/";
  const cleaned = withoutHash.replace(/^\/+/, "");
  if (cleaned.includes("..")) return null;
  return `${root}/${cleaned}`;
};

const resolveFilePath = (pathname) => {
  if (pathname === "/") {
    const indexHtml = `${DIST_DIR}/index.html`;
    return fileExists(indexHtml) ? indexHtml : null;
  }

  const directPath = safeJoin(DIST_DIR, pathname);
  if (directPath && fileExists(directPath)) return directPath;

  const withHtml = safeJoin(DIST_DIR, `${pathname}.html`);
  if (withHtml && fileExists(withHtml)) return withHtml;

  const maybeDirIndex = safeJoin(
    DIST_DIR,
    `${pathname.replace(/\/+$/, "")}/index.html`
  );
  if (maybeDirIndex && fileExists(maybeDirIndex)) return maybeDirIndex;

  const notFound = `${DIST_DIR}/404.html`;
  return fileExists(notFound) ? notFound : null;
};

const resolveRscPath = (pathname) => {
  if (pathname === "/") {
    const proxyIndex = `${DIST_DIR}/__next._index.txt`;
    if (fileExists(proxyIndex)) return proxyIndex;

    const indexTxt = `${DIST_DIR}/index.txt`;
    return fileExists(indexTxt) ? indexTxt : null;
  }

  const cleaned = pathname.replace(/\/+$/, "");
  const proxyIndex = safeJoin(DIST_DIR, `${cleaned}/__next._index.txt`);
  if (proxyIndex && fileExists(proxyIndex)) return proxyIndex;

  const indexTxt = safeJoin(DIST_DIR, `${cleaned}/index.txt`);
  return indexTxt && fileExists(indexTxt) ? indexTxt : null;
};

const port = Number(Bun.env.PORT ?? 4173);
const logRequests = Bun.env.LOG_REQUESTS === "1";
let requestCount = 0;

const server = Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/@vite/client") {
      return new Response("", {
        status: 200,
        headers: {
          "content-type": "application/javascript; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    if (logRequests && requestCount < 200) {
      requestCount += 1;
      console.log(`${req.method} ${url.pathname}${url.search}`);
    }

    if (url.searchParams.has("ide_webview_request_time")) {
      url.searchParams.delete("ide_webview_request_time");
      return Response.redirect(url);
    }

    const wantsRsc =
      url.searchParams.has("_rsc") ||
      (req.headers.get("accept")?.includes("text/x-component") ?? false);

    if (wantsRsc) {
      const direct = safeJoin(DIST_DIR, url.pathname);
      if (direct && fileExists(direct)) {
        const isRscTxt = direct.endsWith(".txt");
        return new Response(Bun.file(direct), {
          status: 200,
          headers: {
            "content-type": isRscTxt
              ? "text/x-component; charset=utf-8"
              : contentTypeFromPath(direct),
            "cache-control": "no-cache",
          },
        });
      }

      const rscPath = resolveRscPath(url.pathname);
      const notFoundRsc = `${DIST_DIR}/_not-found/index.txt`;
      const filePath = rscPath ?? (fileExists(notFoundRsc) ? notFoundRsc : null);

      if (!filePath) {
        return new Response("Not found", { status: 404 });
      }

      return new Response(Bun.file(filePath), {
        status: filePath.endsWith("/_not-found/index.txt") ? 404 : 200,
        headers: {
          "content-type": "text/x-component; charset=utf-8",
          "cache-control": "no-cache",
        },
      });
    }

    const filePath = resolveFilePath(url.pathname);

    if (!filePath) {
      return new Response("Not found", { status: 404 });
    }

    const isNotFound = filePath.endsWith("/404.html");
    const file = Bun.file(filePath);

    return new Response(file, {
      status: isNotFound ? 404 : 200,
      headers: {
        "content-type": contentTypeFromPath(filePath),
        "cache-control": filePath.includes("/_next/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      },
    });
  },
});

console.log(`Serving ${DIST_DIR} at http://localhost:${server.port}`);
