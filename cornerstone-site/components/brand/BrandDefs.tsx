/**
 * Brand Pack v2 — shared SVG defs, mounted once in the root layout.
 *
 * `cs-rough` is the rough-cast displacement that gives the cornerstone mark its
 * softly-cast edge. baseFrequency 0.04 / scale 3.5 is the locked value: cast by
 * hand, not chipped. Do not crank the scale back up.
 */
export default function BrandDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter id="cs-rough" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            seed="8"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
        </filter>
      </defs>
    </svg>
  );
}
