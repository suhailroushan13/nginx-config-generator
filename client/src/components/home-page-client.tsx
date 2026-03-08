"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Copy, Shuffle } from "lucide-react";

const NGINX_TEMPLATE = `server {
    listen 80;
    listen [::]:80;
    server_name $DOMAINS;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location ~ /\\.(?!well-known).* {
        deny all;
        access_log off;
        log_not_found off;
    }
}
`;

function randomPort() {
  return Math.floor(Math.random() * (9999 - 3000 + 1)) + 3000;
}

function generateConfig(domain: string, port: string) {
  return NGINX_TEMPLATE.replace(/\$DOMAINS/g, domain || "$DOMAINS").replace(
    /\$PORT/g,
    port || "$PORT"
  );
}

export function HomePageClient() {
  const [domain, setDomain] = useState("");
  const [port, setPort] = useState("");
  const [config, setConfig] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [domainError, setDomainError] = useState("");
  const [portError, setPortError] = useState("");

  const handleRandomPort = useCallback(() => {
    setPort(String(randomPort()));
    setPortError("");
  }, []);

  const handleGenerate = useCallback(() => {
    const d = domain.trim();
    const p = port.trim();
    setDomainError("");
    setPortError("");
    if (!d) {
      setDomainError("Domain is required");
      return;
    }
    if (!p) {
      setPortError("Port is required");
      return;
    }
    setConfig(generateConfig(d, p));
  }, [domain, port]);

  const handleCopy = useCallback(async () => {
    if (!config) return;
    try {
      await navigator.clipboard.writeText(config);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [config]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
      <section aria-labelledby="generator-heading" className="space-y-1 text-center">
        <h1 id="generator-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Nginx Config Generator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Generate a reverse proxy config for your app
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article aria-label="Generator settings">
          <Card>
            <CardHeader className="space-y-1.5 pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">Settings</CardTitle>
              <CardDescription>
                Enter your domain and port, then generate the config.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="domain">
                  Domain name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="domain"
                  type="text"
                  required
                  placeholder="example.com www.example.com"
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.target.value);
                    if (domainError) setDomainError("");
                  }}
                  className={`w-full ${domainError ? "border-destructive" : ""}`}
                  aria-invalid={!!domainError}
                  aria-describedby={domainError ? "domain-error" : undefined}
                />
                {domainError && (
                  <p id="domain-error" className="text-sm text-destructive" role="alert">
                    {domainError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="port">
                  Port number <span className="text-destructive">*</span>
                </Label>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Input
                    id="port"
                    type="text"
                    inputMode="numeric"
                    required
                    placeholder="3000"
                    value={port}
                    onChange={(e) => {
                      setPort(e.target.value);
                      if (portError) setPortError("");
                    }}
                    className={`flex-1 ${portError ? "border-destructive" : ""}`}
                    aria-invalid={!!portError}
                    aria-describedby={portError ? "port-error" : undefined}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={handleRandomPort}
                    className="shrink-0"
                  >
                    <Shuffle className="size-4 sm:mr-2" aria-hidden />
                    <span className="hidden sm:inline">Random port</span>
                  </Button>
                </div>
                {portError && (
                  <p id="port-error" className="text-sm text-destructive" role="alert">
                    {portError}
                  </p>
                )}
                <p className="text-muted-foreground text-xs">
                  Random port between 3000 and 9999
                </p>
              </div>

              <Button
                type="button"
                className="w-full sm:w-auto cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={handleGenerate}
              >
                Generate config
              </Button>
            </CardContent>
          </Card>
        </article>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="space-y-1.5">
              <CardTitle className="text-lg sm:text-xl">
                Generated config
              </CardTitle>
              <CardDescription>
                Copy and paste into your nginx config.
              </CardDescription>
            </div>
            {config && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="w-full shrink-0 sm:w-auto"
              >
                {copied ? (
                  <Check className="size-4 sm:mr-2" aria-hidden />
                ) : (
                  <Copy className="size-4 sm:mr-2" aria-hidden />
                )}
                {copied ? "Copied!" : "Copy to clipboard"}
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <pre className="bg-muted flex-1 overflow-x-auto overflow-y-auto rounded-lg border p-3 text-xs leading-relaxed sm:p-4 sm:text-sm min-h-[200px]">
              <code>
                {config ||
                  "Generated config will appear here after you fill domain and port and click Generate."}
              </code>
            </pre>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/how-it-works" className="underline hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring rounded">
          How the Nginx config generator works
        </Link>
      </p>

      <footer className="mt-12 sm:mt-16 pt-8 pb-6 border-t border-border text-center">
        <p className="text-muted-foreground text-sm">
          Free tool to generate nginx reverse proxy configs. No sign-up, no tracking.
        </p>
        <p className="mt-3 text-muted-foreground text-sm">
          Built by{" "}
          <a
            href="https://suhailroushan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Suhail Roushan
          </a>
        </p>
      </footer>
    </div>
  );
}
