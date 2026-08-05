"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { TELEMETRY_ENDPOINT } from "@/lib/resources";

/**
 * The soft gate.
 *
 * The page is public and stays public. A link from a post never hits a wall,
 * the resource is indexable, and anyone can read what it is before deciding.
 * The email is asked for once, at the download, in one field.
 *
 * What this deliberately is NOT: a login. There is no session, no password, no
 * magic link, no "already a subscriber?" branch. Someone who has given their
 * address once on this device never sees the field again, and someone who
 * clears their browser types it again and Kit no-ops the duplicate. Building
 * real auth to protect files we are giving away on purpose would cost weeks and
 * lose signups to friction, which is the opposite of what the library is for.
 *
 * Failure modes are all resolved in the visitor's favour: if Kit is down, if
 * telemetry is blocked, if storage is unavailable — they still get the file.
 * The one thing this must never do is stand between someone and a free
 * download because a background call failed.
 */

const KIT_FORM_ID = "9736253";
const KIT_ENDPOINT = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;

/** Per-browser, not per-resource: having asked once is the whole courtesy. */
const SEEN_KEY = "cs_library_email";
const ATTRIBUTION_KEY = "cs_attribution";

type Status = "idle" | "submitting" | "done";

interface Attribution {
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrer?: string | null;
  landingPath?: string | null;
}

function readAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** The ?s= tag that says which post sent them. */
function readSource(): string | null {
  try {
    return new URLSearchParams(window.location.search).get("s");
  } catch {
    return null;
  }
}

/** Fire-and-forget. keepalive so it survives the navigation to the file. */
function track(payload: Record<string, unknown>): void {
  try {
    void fetch(TELEMETRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* telemetry must never break the page it measures */
  }
}

export default function DownloadGate({
  slug,
  href,
  fileName,
  requiresEmail,
  label = "Download it",
}: {
  slug: string;
  href: string;
  fileName: string | null;
  requiresEmail: boolean;
  label?: string;
}) {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [known, setKnown] = useState(false);
  const [asking, setAsking] = useState(false);
  const [failedKit, setFailedKit] = useState(false);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  // Read on mount rather than during render: the page is prerendered, and a
  // localStorage read at render time would make the server and client markup
  // disagree. The gate shows for a frame and then resolves, which is correct —
  // the button is never wrong, it just gets shorter.
  useEffect(() => {
    try {
      if (localStorage.getItem(SEEN_KEY)) setKnown(true);
    } catch {
      /* private browsing: they get asked, they type it, they get the file */
    }
  }, []);

  // One page view per visit, tagged with the post that sent them.
  useEffect(() => {
    track({ kind: "view", slug, source: readSource(), referrer: document.referrer || null });
  }, [slug]);

  const startDownload = useCallback(() => {
    linkRef.current?.click();
  }, []);

  const handOver = useCallback(
    (address: string | null, kitOk: boolean) => {
      const attribution = readAttribution();
      track({
        kind: "download",
        slug,
        source: readSource(),
        email: address,
        kitOk,
        referrer: attribution.referrer ?? document.referrer ?? null,
        landingPath: attribution.landingPath ?? null,
        utmSource: attribution.utmSource ?? null,
        utmMedium: attribution.utmMedium ?? null,
        utmCampaign: attribution.utmCampaign ?? null,
      });
      startDownload();
    },
    [slug, startDownload],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (company) return; // a bot filled the hidden field
    setStatus("submitting");

    let kitOk = false;
    try {
      const res = await fetch(KIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email_address: email }),
      });
      kitOk = res.ok;
    } catch {
      kitOk = false;
    }

    // The address is kept whether or not Kit accepted it. A failed signup is a
    // list problem to fix later, not a reason to withhold the file now.
    try {
      localStorage.setItem(SEEN_KEY, email);
    } catch {
      /* nothing to do */
    }
    setFailedKit(!kitOk);
    setKnown(true);
    setStatus("done");
    handOver(email, kitOk);
  };

  const openGate = () => {
    if (!requiresEmail || known) {
      handOver(null, false);
      return;
    }
    setAsking(true);
  };

  // The real link. Kept in the DOM and clicked programmatically so the browser
  // treats the download as user-initiated (a fetch-then-blob would trip popup
  // blockers and lose the filename).
  const anchor = (
    <a
      ref={linkRef}
      href={href}
      download={fileName ?? undefined}
      target="_blank"
      rel="noreferrer"
      className="hidden"
      aria-hidden="true"
      tabIndex={-1}
    >
      {label}
    </a>
  );

  if (asking && !known) {
    return (
      <div className="rounded-xl border border-line bg-surface/60 p-6">
        {anchor}
        <h3 className="mb-1.5 font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground">
          Where should it go?
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-ink-2">
          One field, once. You will also get Simple Systems Saturday, which is one email a week and one click to leave.
        </p>

        <form onSubmit={submit}>
          <label htmlFor={`${uid}-email`} className="sr-only">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id={`${uid}-email`}
              type="email"
              name="email_address"
              required
              autoComplete="email"
              placeholder="you@yourcompany.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-line bg-background px-4 py-3.5 text-foreground transition-colors duration-200 placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:flex-1"
            />
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="pointer-events-none absolute -m-px h-px w-px overflow-hidden opacity-0"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="ease-[var(--ease-out)] inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3.5 font-sans text-[0.9rem] font-semibold tracking-[0.01em] text-accent-txt transition-[transform,background-color,border-color] duration-200 hover:border-accent-dk hover:bg-accent-dk active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
            >
              {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} aria-hidden="true" />}
              {status === "submitting" ? "One moment" : "Send it over"}
            </button>
          </div>
        </form>

        <button
          onClick={() => {
            setAsking(false);
            handOver(null, false);
          }}
          className="mt-3 text-sm text-muted underline underline-offset-4 hover:text-ink-2"
        >
          Or just take the file
        </button>
      </div>
    );
  }

  return (
    <div>
      {anchor}
      <button
        onClick={openGate}
        className="ease-[var(--ease-out)] group inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3.5 font-sans text-[0.9rem] font-semibold tracking-[0.01em] text-accent-txt transition-[transform,background-color,border-color] duration-200 hover:border-accent-dk hover:bg-accent-dk active:scale-[0.97]"
      >
        <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        {label}
      </button>

      {status === "done" && (
        <p className="mt-3 flex items-start gap-2 text-sm text-ink-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-dk" strokeWidth={2.25} aria-hidden="true" />
          <span>
            {failedKit
              ? "It is downloading now. The newsletter signup did not go through, so email info@cornerstone-ai.pro if you wanted that too."
              : "It is downloading now. Confirm the email in your inbox and Saturday's issue will follow."}
          </span>
        </p>
      )}
    </div>
  );
}
