import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://osmedeus.org"),
  title: "Osmedeus - Security Orchestration Engine",
  description: "Osmedeus - Modern Orchestration Engine for Security",
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
    title: "Osmedeus - Security Orchestration Engine",
    description: "Osmedeus - Modern Orchestration Engine for Security",
    url: "https://osmedeus.org",
    siteName: "Osmedeus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.png",
        width: 1280,
        height: 640,
        alt: "Osmedeus - Security Orchestration Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osmedeus - Security Orchestration Engine",
    description: "Osmedeus - Modern Orchestration Engine for Security",
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
      <body className={`${inter.variable} antialiased`}>
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
