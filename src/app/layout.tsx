import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Osmedeus - Security Orchestration Engine",
  description:
    "Modern orchestration engine for security automation with declarative YAML workflows. Automate reconnaissance, vulnerability scanning, and more.",
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
    description:
      "Security automation made simple. Declarative YAML workflows for pentesting and security automation.",
    url: "https://osmedeus.org",
    siteName: "Osmedeus",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Osmedeus - Security Orchestration Engine",
    description:
      "Security automation made simple. Declarative YAML workflows for pentesting and security automation.",
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
