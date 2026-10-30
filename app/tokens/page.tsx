import type { Metadata } from "next";
import type { ReactNode } from "react";
import { colors, radii, spacing, textStyles, type ColorNamespace } from "./tokens";

export const metadata: Metadata = {
  title: "Tokens · Gurises Unidos",
};

// The tokens come from ./tokens.ts, generated from Figma (npm run tokens).
// This page only decides how to show them.

const sections = [
  { id: "color", title: "Color" },
  { id: "estilos-de-texto", title: "Estilos de texto" },
  { id: "radios", title: "Radios" },
  { id: "espaciado", title: "Espaciado" },
];

const colorGroups: { namespace: ColorNamespace; title: string }[] = [
  { namespace: "bg", title: "Fondo" },
  { namespace: "text", title: "Texto" },
  { namespace: "icon", title: "Ícono" },
  { namespace: "border", title: "Borde" },
  { namespace: "action", title: "Acción" },
  { namespace: "focus", title: "Foco" },
  { namespace: "feedback", title: "Estado" },
];

// How each color is previewed depends on what its class paints.
function colorSample(utility: string) {
  if (utility.startsWith("text-")) return <span className={`text-heading-metric ${utility}`}>Aa</span>;
  if (utility.startsWith("border-")) return <span className={`block size-8 rounded-md border-2 ${utility}`} />;
  if (utility.startsWith("outline-")) return <span className={`block size-6 rounded-md outline-2 outline-offset-2 ${utility}`} />;
  return <span className={`block size-8 rounded-md border border-border-default ${utility}`} />;
}

// Largest first, like the type scale in DESIGN.md.
const textStylesBySize = [...textStyles].sort((a, b) => b.size - a.size);

const weightNames: Record<number, string> = { 400: "Regular", 500: "Medium", 600: "Semi Bold", 700: "Bold" };

// One anatomy for every row: the preview on the left, then the class, the
// Figma name with its value, and the usage note when Figma has one.
function TokenRow({
  sample,
  sampleAlign = "center",
  utility,
  details,
  note,
  children,
}: {
  sample: ReactNode;
  sampleAlign?: "center" | "start";
  utility: string;
  details: string;
  note?: string | null;
  children?: ReactNode;
}) {
  return (
    <li className="flex items-start gap-4 p-3">
      <span
        aria-hidden="true"
        className={`flex size-10 shrink-0 items-center ${sampleAlign === "start" ? "justify-start" : "justify-center"}`}
      >
        {sample}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <code className="text-label-sm wrap-anywhere">{utility}</code>
        <span className="text-label-xs text-text-muted wrap-anywhere">{details}</span>
        {children}
        {note ? <p className="text-label-xs text-pretty text-text-default">{note}</p> : null}
      </div>
    </li>
  );
}

function TokenList({ children }: { children: ReactNode }) {
  return (
    <ul className="flex flex-col divide-y divide-border-default rounded-lg border border-border-default">
      {children}
    </ul>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4 border-t border-border-default pt-6">
      <h2 id={id} className="text-heading-section">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function TokensPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-section">Tokens del sistema</h1>
          <p className="text-body-sm text-text-muted">
            Cada variable de Figma con su clase de Tailwind, su valor y cuándo usarla. Se genera
            desde Figma: para cambiar un token, se cambia ahí.
          </p>
        </div>
        <nav aria-label="Secciones">
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="rounded-sm text-label-sm text-action-secondary-text underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-focus-ring"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <Section id="color" title="Color">
        {colorGroups.map(({ namespace, title }) => (
          <div key={namespace} className="flex flex-col gap-2">
            <h3 className="text-label-md text-text-default">{title}</h3>
            <TokenList>
              {colors
                .filter((color) => color.namespace === namespace)
                .map(({ figma, utility, value, primitive, note }) => (
                  <TokenRow
                    key={figma}
                    sample={colorSample(utility)}
                    utility={utility}
                    details={`${figma} → ${primitive} · ${value}`}
                    note={note}
                  />
                ))}
            </TokenList>
          </div>
        ))}
      </Section>

      <Section id="estilos-de-texto" title="Estilos de texto">
        <TokenList>
          {textStylesBySize.map(({ figma, utility, size, lineHeight, weight, note }) => (
            <TokenRow
              key={figma}
              sample={<span className={utility}>Aa</span>}
              utility={utility}
              details={`${figma} · ${size} / ${lineHeight} · ${weightNames[weight] ?? weight}`}
              note={note}
            >
              <span className={`${utility} wrap-anywhere`}>Niñas, niños y adolescentes alcanzados 1.284</span>
            </TokenRow>
          ))}
        </TokenList>
      </Section>

      <Section id="radios" title="Radios">
        <TokenList>
          {radii.map(({ figma, utility, px, note }) => (
            <TokenRow
              key={figma}
              sample={
                <span className={`block size-10 border border-border-accent bg-bg-accent-subtle ${utility}`} />
              }
              utility={utility}
              details={`${figma} · ${px}px`}
              note={note}
            />
          ))}
        </TokenList>
      </Section>

      <Section id="espaciado" title="Espaciado">
        <TokenList>
          {spacing.map(({ figma, padding, width, px }) => (
            <TokenRow
              key={figma}
              sample={<span className={`block h-4 border-x border-border-accent bg-bg-accent-subtle ${width}`} />}
              sampleAlign="start"
              utility={padding}
              details={`${figma} · ${px}px`}
            />
          ))}
        </TokenList>
      </Section>
    </main>
  );
}
