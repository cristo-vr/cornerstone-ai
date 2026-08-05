import React from "react";

/**
 * A deliberately small markdown renderer for resource copy.
 *
 * The site already has MDX, and MDX is the wrong tool here: it compiles JSX, so
 * a stray `<` in a description written in a panel textarea becomes a failed
 * build of the entire marketing site. This handles the five things resource copy
 * actually uses and treats everything else as literal text.
 *
 * Supported: `## heading`, `- list item`, `1. list item`, blank-line paragraphs,
 * `**bold**`, `` `code` ``, and `[text](https://url)`. No raw HTML, ever — the
 * output is React elements, so there is nothing to sanitise.
 */

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\((https?:\/\/[^)\s]+)\))/g;

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(INLINE);

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const token = match[0];

    if (token.startsWith("**")) {
      out.push(
        <strong key={`${keyPrefix}-b-${match.index}`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      out.push(
        <code
          key={`${keyPrefix}-c-${match.index}`}
          className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const split = token.indexOf("](");
      const label = token.slice(1, split);
      const href = token.slice(split + 2, -1);
      out.push(
        <a
          key={`${keyPrefix}-a-${match.index}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-accent-dk underline underline-offset-4 hover:text-primary"
        >
          {label}
        </a>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Prose({ children }: { children: string | null }) {
  if (!children?.trim()) return null;

  // Blocks are separated by blank lines. Consecutive list lines stay one block
  // so a list renders as a list rather than as one paragraph per bullet.
  const blocks = children.replace(/\r\n/g, "\n").split(/\n{2,}/);

  return (
    <div className="space-y-4 leading-relaxed text-ink-2">
      {blocks.map((raw, i) => {
        const block = raw.trim();
        if (!block) return null;
        const lines = block.split("\n");

        if (block.startsWith("## ")) {
          return (
            <h3
              key={i}
              className="pt-2 font-display text-xl font-bold uppercase tracking-[0.005em] text-foreground"
            >
              {inline(block.slice(3).trim(), `h${i}`)}
            </h3>
          );
        }

        if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {lines.map((l, j) => (
                <li key={j} className="relative pl-5">
                  <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 bg-primary" aria-hidden="true" />
                  {inline(l.replace(/^\s*[-*]\s+/, ""), `u${i}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }

        if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
          return (
            <ol key={i} className="space-y-2 pl-1">
              {lines.map((l, j) => (
                <li key={j} className="relative pl-7">
                  <span className="absolute left-0 top-0 font-display text-sm font-bold text-accent-dk">
                    {j + 1}
                  </span>
                  {inline(l.replace(/^\s*\d+\.\s+/, ""), `o${i}-${j}`)}
                </li>
              ))}
            </ol>
          );
        }

        return <p key={i}>{inline(block.replace(/\n/g, " "), `p${i}`)}</p>;
      })}
    </div>
  );
}
