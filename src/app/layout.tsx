import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeToggle } from "../components/theme-toggle";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "../../lib/site";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.description,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: site.name }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
            <nav
              aria-label="Site"
              className="mx-auto flex h-10 max-w-2xl items-center justify-between px-4 sm:px-5"
            >
              <Link href="/" className="no-underline text-inherit">
                <span className="text-lg font-serif">
                  memo&apos;s music journal
                </span>
              </Link>
              <ThemeToggle />
            </nav>
          </header>
          <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-5 sm:py-8">
            <main>{children}</main>
          </div>
          <footer className="sticky bottom-0 border-t border-border bg-background px-4 py-3 text-right text-xs text-muted-foreground">
            <div className="mx-auto max-w-2xl">
              <span>
                {new Date().getFullYear()} made by a{" "}
                <a
                  href="https://memorebo.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-muted-foreground/90 focus:text-muted-foreground/90"
                >
                  human
                </a>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
