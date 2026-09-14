/**
 * The resource library, read from Supabase at BUILD time.
 *
 * Why build time and not a client fetch: these pages are the destination of
 * every link in every post. They have to be indexable, they have to render
 * instantly, and they have to keep working if Supabase is having a bad morning.
 * A client-side fetch gives up all three to save a rebuild.
 *
 * The cost is that publishing a resource does not put it on the internet — the
 * site has to rebuild. That is a deliberate, visible step in the panel (Content
 * → Resources → Rebuild the site), not something that silently doesn't happen.
 *
 * Both values below are publishable. The anon key ships inside the panel's own
 * JS bundle already, and every row it can reach here is one marked `published`,
 * which is a synonym for "meant to be public". It still comes from the
 * environment rather than the repo so rotating it is a setting, not a commit.
 */

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://pfcishzfmhkrjbjyognf.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

/** Where the panel's public telemetry endpoint lives (the AIOS Pages project). */
export const TELEMETRY_ENDPOINT = "https://aios.cornerstone-ai.pro/api/public/resource-event";

export type ResourceKind = "skill" | "template" | "guide" | "tool" | "checklist";

export const KIND_LABEL: Record<ResourceKind, string> = {
  skill: "Claude Code skill",
  template: "Template",
  guide: "Guide",
  tool: "Tool",
  checklist: "Checklist",
};

export interface Resource {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  how_to: string | null;
  kind: ResourceKind;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  external_url: string | null;
  video_url: string | null;
  requires_email: boolean;
  sort_order: number;
  published_at: string | null;
}

const COLS = [
  "id", "slug", "title", "summary", "description", "how_to", "kind",
  "file_path", "file_name", "file_size", "external_url", "video_url",
  "requires_email", "sort_order", "published_at",
].join(",");

/** The public URL of a stored file. The bucket is public-read by design. */
export function fileUrl(resource: Resource): string | null {
  if (resource.external_url) return resource.external_url;
  if (!resource.file_path) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/resources/${resource.file_path}`;
}

export function fileSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

let cache: Resource[] | null = null;

/**
 * Every published resource, ordered as the panel orders them.
 *
 * Never throws. A failed fetch here would take down the whole site build over a
 * page that is additive to it, so it degrades to an empty library and says so
 * loudly in the build log instead.
 */
export async function getResources(): Promise<Resource[]> {
  if (cache) return cache;

  if (!SUPABASE_ANON_KEY) {
    console.warn(
      "[resources] SUPABASE_ANON_KEY is not set, so the library will build empty. " +
        "Set it in the Cloudflare Pages build environment.",
    );
    cache = [];
    return cache;
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/library_resources?status=eq.published&select=${COLS}&order=sort_order.asc,published_at.desc`,
      {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        // ⚠ Not `cache: "no-store"`. Next treats that as a request for dynamic
        // rendering and bails out of static generation — silently, in a worker,
        // which is how the sitemap quietly lost every resource URL while the
        // pages themselves built fine. Freshness comes from the module-level
        // cache below (one fetch per build) and from the fact that `out/` is
        // rebuilt from scratch on every deploy.
        cache: "force-cache",
      },
    );
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    cache = (await res.json()) as Resource[];
    console.log(`[resources] ${cache.length} published resource(s) built into the site.`);
    return cache;
  } catch (err) {
    console.warn("[resources] could not load the library, building it empty:", err);
    cache = [];
    return cache;
  }
}

export async function getResource(slug: string): Promise<Resource | null> {
  const all = await getResources();
  return all.find((r) => r.slug === slug) ?? null;
}
