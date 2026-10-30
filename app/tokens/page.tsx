import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tokens · Gurises Unidos",
};

// Each row: the Figma variable, the Tailwind class that uses it, and how to
// preview it. Classes are written in full so Tailwind can find them.
type Sample = "text" | "fill" | "border" | "outline";

const colors: { token: string; utility: string; sample: Sample }[] = [
  { token: "color/bg/surface", utility: "bg-bg-surface", sample: "fill" },
  { token: "color/bg/accent-subtle", utility: "bg-bg-accent-subtle", sample: "fill" },
  { token: "color/bg/skeleton", utility: "bg-bg-skeleton", sample: "fill" },
  { token: "color/text/default", utility: "text-text-default", sample: "text" },
  { token: "color/text/muted", utility: "text-text-muted", sample: "text" },
  { token: "color/text/disabled", utility: "text-text-disabled", sample: "text" },
  { token: "color/icon/accent", utility: "text-icon-accent", sample: "text" },
  { token: "color/border/default", utility: "border-border-default", sample: "border" },
  { token: "color/border/accent", utility: "border-border-accent", sample: "border" },
  { token: "color/action/primary/bg", utility: "bg-action-primary-bg", sample: "fill" },
  { token: "color/action/primary/bg-hover", utility: "bg-action-primary-bg-hover", sample: "fill" },
  { token: "color/action/secondary/border", utility: "border-action-secondary-border", sample: "border" },
  { token: "color/action/secondary/text", utility: "text-action-secondary-text", sample: "text" },
  { token: "color/action/subtle/bg-hover", utility: "bg-action-subtle-bg-hover", sample: "fill" },
  { token: "color/action/disabled/bg", utility: "bg-action-disabled-bg", sample: "fill" },
  { token: "color/focus/ring", utility: "outline-focus-ring", sample: "outline" },
  { token: "color/feedback/positive", utility: "text-feedback-positive", sample: "text" },
  { token: "color/feedback/negative", utility: "text-feedback-negative", sample: "text" },
  { token: "color/feedback/neutral", utility: "text-feedback-neutral", sample: "text" },
  { token: "color/feedback/positive-subtle", utility: "bg-feedback-positive-subtle", sample: "fill" },
  { token: "color/feedback/negative-subtle", utility: "bg-feedback-negative-subtle", sample: "fill" },
  { token: "color/feedback/neutral-subtle", utility: "bg-feedback-neutral-subtle", sample: "fill" },
];

const sampleClasses: Record<Sample, string> = {
  text: "text-heading-metric",
  fill: "block size-8 rounded-md border border-border-default",
  border: "block size-8 rounded-md border-2",
  outline: "block size-8 rounded-md outline-2 outline-offset-2",
};

const textStyles = [
  { token: "heading/metric", utility: "text-heading-metric", spec: "28 / 36 · Semi Bold" },
  { token: "heading/section", utility: "text-heading-section", spec: "20 / 28 · Semi Bold" },
  { token: "label/md", utility: "text-label-md", spec: "14 / 20 · Medium" },
  { token: "label/sm", utility: "text-label-sm", spec: "13 / 20 · Medium" },
  { token: "label/xs", utility: "text-label-xs", spec: "12 / 16 · Medium" },
  { token: "body/sm", utility: "text-body-sm", spec: "14 / 20 · Regular" },
];

const radii = [
  { token: "radius/sm", utility: "rounded-sm", px: 6 },
  { token: "radius/md", utility: "rounded-md", px: 8 },
  { token: "radius/lg", utility: "rounded-lg", px: 12 },
  { token: "radius/full", utility: "rounded-full", px: 9999 },
];

const spacing = [
  { token: "space/0-5", width: "w-0.5", px: 2 },
  { token: "space/1", width: "w-1", px: 4 },
  { token: "space/1-5", width: "w-1.5", px: 6 },
  { token: "space/2", width: "w-2", px: 8 },
  { token: "space/2-5", width: "w-2.5", px: 10 },
  { token: "space/3", width: "w-3", px: 12 },
  { token: "space/4", width: "w-4", px: 16 },
  { token: "space/5", width: "w-5", px: 20 },
  { token: "space/6", width: "w-6", px: 24 },
  { token: "space/8", width: "w-8", px: 32 },
];

function TokenName({ utility, token }: { utility: string; token: string }) {
  return (
    <div className="flex min-w-0 flex-col">
      <code className="text-label-sm wrap-anywhere">{utility}</code>
      <span className="text-label-xs text-text-muted">{token}</span>
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <h2 id={id} className="text-label-md text-text-muted">
        {title}
      </h2>
      <ul className="flex flex-col divide-y divide-border-default rounded-lg border border-border-default">
        {children}
      </ul>
    </section>
  );
}

export default function TokensPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-heading-section">Tokens del sistema</h1>
        <p className="text-body-sm text-text-muted">
          Cada variable de Figma con la clase de Tailwind que la usa.
        </p>
      </header>

      <Group title="Color">
        {colors.map(({ token, utility, sample }) => (
          <li key={token} className="flex items-center justify-between gap-4 p-3">
            <TokenName utility={utility} token={token} />
            <span aria-hidden="true" className={`shrink-0 ${sampleClasses[sample]} ${utility}`}>
              {sample === "text" ? "Aa" : null}
            </span>
          </li>
        ))}
      </Group>

      <Group title="Estilos de texto">
        {textStyles.map(({ token, utility, spec }) => (
          <li key={token} className="flex flex-col gap-1 p-3">
            <span className={utility}>Niñas, niños y adolescentes alcanzados 1.284</span>
            <span className="text-label-xs text-text-muted">
              <code>{utility}</code> · {token} · {spec}
            </span>
          </li>
        ))}
      </Group>

      <Group title="Radios">
        {radii.map(({ token, utility, px }) => (
          <li key={token} className="flex items-center justify-between gap-4 p-3">
            <TokenName utility={utility} token={`${token} · ${px}px`} />
            <span
              aria-hidden="true"
              className={`size-10 shrink-0 border border-action-secondary-border bg-bg-accent-subtle ${utility}`}
            />
          </li>
        ))}
      </Group>

      <Group title="Espaciado">
        {spacing.map(({ token, width, px }) => (
          <li key={token} className="flex items-center justify-between gap-4 p-3">
            <TokenName utility={width.replace("w-", "p-")} token={`${token} · ${px}px`} />
            <span aria-hidden="true" className={`h-4 shrink-0 bg-action-primary-bg ${width}`} />
          </li>
        ))}
      </Group>
    </main>
  );
}
