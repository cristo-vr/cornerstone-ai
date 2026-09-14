import type { APIRoute } from "astro";
import { getResources } from "../lib/resources";

const SITE = "https://cornerstone-ai.pro";

export const GET: APIRoute = async () => {
  const resources = await getResources();
  const urls: Array<[string, string, string]> = [
    ["/", "monthly", "1.0"],
    ["/about", "monthly", "0.7"],
    ["/resources", "weekly", "0.8"],
    ...resources.map((r): [string, string, string] => [`/resources/${r.slug}`, "monthly", "0.7"]),
    ["/simple-systems", "monthly", "0.6"],
    ["/privacy", "yearly", "0.2"],
    ["/terms", "yearly", "0.2"],
    ["/refund-policy", "yearly", "0.2"],
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([p, f, pr]) => `  <url><loc>${SITE}${p}</loc><changefreq>${f}</changefreq><priority>${pr}</priority></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
