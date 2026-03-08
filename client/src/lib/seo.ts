/**
 * Central SEO configuration and constants.
 * Canonical domain: https://nginx.suhail.app
 */

export const SITE_URL = "https://nginx.suhail.app" as const;
export const SITE_NAME = "Nginx Config Generator" as const;
export const BRAND = "Nginx Config Generator" as const;

/** Primary keyword (home): nginx config generator — Commercial/Transactional intent */
export const DEFAULT_TITLE = "Nginx Config Generator";
export const DEFAULT_DESCRIPTION =
  "Generate a reverse proxy nginx config in seconds. Enter your domain and port—get a ready-to-use server block with WebSocket support. Free, no signup. Try it now.";
export const DEFAULT_KEYWORDS = [
  "nginx config generator",
  "nginx reverse proxy config",
  "nginx server block generator",
  "nginx proxy config",
  "nginx websocket config",
];

export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Page-specific metadata: 1 keyword = 1 page to avoid cannibalization */
export const PAGES = {
  home: {
    path: "/",
    title: "Nginx Config Generator",
    description: DEFAULT_DESCRIPTION,
    keyword: "nginx config generator",
  },
  howItWorks: {
    path: "/how-it-works",
    title: "How It Works",
    description:
      "Learn how the Nginx config generator creates server blocks for reverse proxy and WebSocket. Step-by-step guide and best practices.",
    keyword: "how nginx reverse proxy works",
  },
} as const;

export function canonicalUrl(path: string = ""): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p === "/" ? "" : p}`;
}
