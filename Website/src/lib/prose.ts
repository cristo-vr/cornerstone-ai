/**
 * A deliberately small markdown renderer for resource copy written in the
 * panel's textarea. Handles the handful of things that copy uses and treats
 * everything else as literal text. Every character is escaped first, so no
 * raw HTML ever gets through.
 *
 * Supported: `## heading`, `- item`, `1. item`, blank-line paragraphs,
 * `**bold**`, `` `code` ``, and `[text](https://url)`.
 */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;

function inline(text: string): string {
  return esc(text).replace(INLINE, (token) => {
    if (token.startsWith("**")) return `<strong>${token.slice(2, -2)}</strong>`;
    if (token.startsWith("`")) return `<code>${token.slice(1, -1)}</code>`;
    const m = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (m) return `<a href="${m[2]}" rel="noopener" target="_blank">${m[1]}</a>`;
    return token;
  });
}

export function prose(md: string): string {
  const out: string[] = [];
  let list: "ul" | "ol" | null = null;
  const close = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  for (const block of md.replace(/\r\n/g, "\n").split(/\n{2,}/)) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => /^- /.test(l))) {
      close();
      out.push(`<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`);
      continue;
    }
    if (lines.every((l) => /^\d+\. /.test(l))) {
      close();
      out.push(`<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`);
      continue;
    }
    for (const line of lines) {
      const h = line.match(/^(#{2,3}) (.+)$/);
      if (h) {
        close();
        out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      } else if (/^- /.test(line)) {
        if (list !== "ul") { close(); list = "ul"; out.push("<ul>"); }
        out.push(`<li>${inline(line.slice(2))}</li>`);
      } else if (/^\d+\. /.test(line)) {
        if (list !== "ol") { close(); list = "ol"; out.push("<ol>"); }
        out.push(`<li>${inline(line.replace(/^\d+\. /, ""))}</li>`);
      } else {
        close();
        out.push(`<p>${inline(line)}</p>`);
      }
    }
    close();
  }
  close();
  return out.join("\n");
}
