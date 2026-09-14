/**
 * The resource library, read from Supabase at BUILD time.
 *
 * Every link in every LinkedIn post lands here, so the pages have to be
 * indexable, instant, and unbothered by Supabase having a bad morning. The
 * cost is that publishing a resource does not put it on the internet until the
 * site rebuilds, which the panel does with its "Rebuild the site" button.
 *
 * The anon key is publishable (it ships inside the panel's own bundle) and can
 * only see rows marked `published`, which is a synonym for "meant to be public".
 * It still comes from the environment so rotating it is a setting, not a commit.
 */

export const SUPABASE_URL = "https://pfcishzfmhkrjbjyognf.supabase.co";
const ANON_KEY = import.meta.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

export type ResourceKind = "skill" | "template" | "guide" | "tool" | "checklist";

export const KIND_LABEL: Record<ResourceKind, string> = {
  skill: "Claude skill",
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
export function fileUrl(r: Resource): string | null {
  if (r.external_url) return r.external_url;
  if (!r.file_path) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/resources/${r.file_path}`;
}

export function fileSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

let cache: Resource[] | null = null;

/** Every published resource, in the panel's order. Never throws: a bad fetch
 *  builds an empty library and says so in the build log. */
export async function getResources(): Promise<Resource[]> {
  if (cache) return cache;
  if (!ANON_KEY) {
    console.warn("[resources] SUPABASE_ANON_KEY is not set, so the library builds empty.");
    return (cache = []);
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/library_resources?status=eq.published&select=${COLS}&order=sort_order.asc,published_at.desc`,
      { headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` } },
    );
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    cache = (await res.json()) as Resource[];
    console.log(`[resources] ${cache.length} published resource(s) built into the site.`);
    return cache;
  } catch (err) {
    console.warn("[resources] could not load the library, building it empty:", err);
    return (cache = []);
  }
}
