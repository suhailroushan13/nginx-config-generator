import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { PAGES, canonicalUrl } from "@/lib/seo";

export const metadata = {
  title: PAGES.howItWorks.title,
  description: PAGES.howItWorks.description,
  alternates: { canonical: canonicalUrl(PAGES.howItWorks.path) },
  openGraph: {
    title: PAGES.howItWorks.title,
    description: PAGES.howItWorks.description,
    url: canonicalUrl(PAGES.howItWorks.path),
  },
  twitter: {
    title: PAGES.howItWorks.title,
    description: PAGES.howItWorks.description,
  },
};

export default function HowItWorksPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "How it works" },
  ];

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="mx-auto max-w-3xl space-y-8">
        <Breadcrumbs items={breadcrumbItems} />

        <article>
          <header className="space-y-2 mb-8">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How the Nginx Reverse Proxy Config Generator Works
            </h1>
            <p className="text-muted-foreground">
              A short guide to the generated server block and how to use it.
            </p>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">What you get</h2>
              <p>
                The <Link href="/" className="underline hover:no-underline">Nginx config generator</Link> outputs a single <strong>server block</strong> that:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Listens on port 80 (HTTP) for IPv4 and IPv6</li>
                <li>Uses your domain(s) as <code className="bg-muted px-1 rounded">server_name</code></li>
                <li>Proxies requests to your app running on a local port</li>
                <li>Supports WebSocket upgrades (e.g. for hot reload or real-time features)</li>
                <li>Hides dotfiles (e.g. <code className="bg-muted px-1 rounded">.env</code>) from public access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Step-by-step usage</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Enter your domain (e.g. <code className="bg-muted px-1 rounded">example.com www.example.com</code>) and the port where your app runs (e.g. 3000).</li>
                <li>Click &quot;Generate config&quot; and copy the generated block.</li>
                <li>Save it to a file under <code className="bg-muted px-1 rounded">/etc/nginx/sites-available/</code> (e.g. <code className="bg-muted px-1 rounded">example.com</code>) and create a symlink in <code className="bg-muted px-1 rounded">sites-enabled</code>, or include it in your main <code className="bg-muted px-1 rounded">nginx.conf</code>.</li>
                <li>Run <code className="bg-muted px-1 rounded">nginx -t</code> to test, then reload Nginx (e.g. <code className="bg-muted px-1 rounded">systemctl reload nginx</code>).</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Best practices</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use HTTPS in production: put the block inside a redirect from HTTP to HTTPS, or use a tool like Certbot to add SSL and get a matching <code className="bg-muted px-1 rounded">listen 443 ssl</code> block.</li>
                <li>Keep one server block per site or app to avoid duplication and make updates easier.</li>
                <li>Restrict the port range if you use the random port button (e.g. 3000–9999); ensure only your app listens on that port.</li>
              </ul>
            </section>
          </div>
        </article>

        <p>
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            ← Back to Nginx Config Generator
          </Link>
        </p>
      </div>
    </main>
  );
}
