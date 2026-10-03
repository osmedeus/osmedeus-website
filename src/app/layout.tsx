import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  // Labels only (eyebrows, chips, captions): not worth a slot on the critical
  // path ahead of the stylesheet. Loads with the CSS and swaps in.
  preload: false,
});

const title = "Osmedeus - Modern Orchestration Engine for Security";

export const metadata: Metadata = {
  metadataBase: new URL("https://osmedeus.org"),
  title,
  description: title,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "security",
    "automation",
    "orchestration",
    "pentesting",
    "vulnerability scanning",
    "reconnaissance",
  ],
  authors: [{ name: "Osmedeus Team" }],
  openGraph: {
    title,
    description: title,
    url: "https://osmedeus.org",
    siteName: "Osmedeus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.png",
        width: 1280,
        height: 640,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: title,
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {/* Dev only: quiets the abort noise an IDE preview pane raises. In
            production it would also swallow real errors that say "aborted". */}
        {process.env.NODE_ENV === "development" && (
          <Script id="suppress-abort-errors" strategy="beforeInteractive">
            {`(function () {
  function shouldSuppress(v) {
    var s = "";
    try {
      s = String(v == null ? "" : v);
    } catch (e) {
      s = "";
    }
    return (
      s.indexOf("net::ERR_ABORTED") !== -1 ||
      s.indexOf("AbortError") !== -1 ||
      s.indexOf("aborted") !== -1 ||
      s.indexOf("ERR_ABORTED") !== -1
    );
  }

  function patchConsole(method) {
    try {
      var c = window.console;
      if (!c) return;

      var orig = c[method];
      if (typeof orig !== "function") return;

      var wrapped = function () {
        try {
          for (var i = 0; i < arguments.length; i++) {
            if (shouldSuppress(arguments[i])) return;
          }
        } catch (e) {}

        try {
          return orig.apply(c, arguments);
        } catch (e) {
          try {
            return orig.apply(null, arguments);
          } catch (e2) {}
        }
      };

      try {
        c[method] = wrapped;
      } catch (e) {
        try {
          Object.defineProperty(c, method, {
            value: wrapped,
            configurable: true,
            writable: true
          });
        } catch (e2) {}
      }
    } catch (e) {}
  }

  patchConsole("error");
  patchConsole("warn");
  patchConsole("log");

  try {
    if (!window.addEventListener) return;

    window.addEventListener("unhandledrejection", function (e) {
      try {
        if (shouldSuppress(e && e.reason) && e && e.preventDefault) {
          e.preventDefault();
        }
      } catch (err) {}
    });

    window.addEventListener(
      "error",
      function (e) {
        try {
          if (shouldSuppress(e && e.message) && e && e.preventDefault) {
            e.preventDefault();
          }
        } catch (err) {}
      },
      true
    );
  } catch (e) {}
})();`}
          </Script>
        )}
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
