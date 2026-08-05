import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/content/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NKT Studio — разработка сайтов в Беларуси",
    template: "%s · NKT Studio",
  },
  description:
    "Лендинги, многостраничные сайты и редизайн для бизнеса в Беларуси. Никита Семенов — структура, дизайн, разработка и запуск.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: SITE_URL,
    siteName: "NKT Studio",
    title: "NKT Studio — разработка сайтов в Беларуси",
    description:
      "Лендинги, многостраничные сайты и редизайн для бизнеса в Беларуси. Никита Семенов — структура, дизайн, разработка и запуск.",
    images: [
      {
        url: "/og/nkt-studio-cover.png",
        width: 1200,
        height: 630,
        alt: "NKT Studio — разработка сайтов в Беларуси",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NKT Studio — разработка сайтов в Беларуси",
    description:
      "Лендинги, многостраничные сайты и редизайн для бизнеса в Беларуси. Никита Семенов — структура, дизайн, разработка и запуск.",
    images: ["/og/nkt-studio-cover.png"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={cn("h-full antialiased", syne.variable, manrope.variable)}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
