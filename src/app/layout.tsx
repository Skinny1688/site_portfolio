import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { cn } from "@/lib/utils";
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
  title: "SiteScan — сайты под ключ | Никита",
  description:
    "Портфолио Никиты: сайты под ключ и редизайн для малого бизнеса. Примеры работ, отзывы, заявка.",
  metadataBase: new URL("https://sitescan.online"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={cn("h-full antialiased", syne.variable, manrope.variable)}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
