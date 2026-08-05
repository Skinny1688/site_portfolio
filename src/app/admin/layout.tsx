import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · NKT Studio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[70vh] bg-muted/40 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-5xl">{children}</div>
    </div>
  );
}
