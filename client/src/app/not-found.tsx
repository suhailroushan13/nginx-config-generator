import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
        404
      </h1>
      <p className="text-muted-foreground text-lg mb-6 text-center">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring"
      >
        Back to Nginx Config Generator
      </Link>
    </main>
  );
}
