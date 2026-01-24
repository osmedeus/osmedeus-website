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
          {`(()=>{
const shouldSuppress=(v)=>{
  const s=String(v??"");
  return s.includes("net::ERR_ABORTED")||s.includes("AbortError")||s.includes("aborted")||s.includes("ERR_ABORTED");
};
const patch=(k)=>{
  const orig=console[k];
  if(typeof orig!=="function") return;
  console[k]=(...args)=>{
    if(args.some(shouldSuppress)) return;
    orig(...args);
  };
};
patch("error");
patch("warn");
patch("log");
window.addEventListener("unhandledrejection",(e)=>{
  if(shouldSuppress(e.reason)) e.preventDefault();
});
window.addEventListener("error",(e)=>{
  if(shouldSuppress(e.message)) e.preventDefault();
},true);
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
