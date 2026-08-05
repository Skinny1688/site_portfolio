import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress className="z-[60] h-[3px] bg-gradient-to-r from-secondary via-accent to-accent" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
