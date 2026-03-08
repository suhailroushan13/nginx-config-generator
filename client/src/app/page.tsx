import { HomePageClient } from "@/components/home-page-client";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }]} />
      <HomePageClient />
    </main>
  );
}
