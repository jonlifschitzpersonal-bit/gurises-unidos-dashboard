import { cva } from "class-variance-authority";
import { useId, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { cn } from "@/lib/cn";

/*
  Figma: MetricCard (02 - Components). Not clickable: no hover, no focus.
  Its width comes from the grid it sits in (min 240px, Figma annotation):
  repeat(auto-fill, minmax(15rem, 1fr)). The 280px in Figma is a sample.
*/

type Trend = "up" | "down" | "neutral";

const trendIcons: Record<Trend, IconName> = {
  up: "arrow-up",
  down: "arrow-down",
  neutral: "minus",
};

// The arrow already gives the direction: a sign from the data ("+4,0 %") is dropped.
function withoutSign(value: string) {
  return value.replace(/^[+\-−]\s*/, "");
}

// Read instead of the arrow and the color (copy approved in class 2.6).
function trendText(trend: Trend, value: string) {
  if (trend === "neutral") return `Sin cambios (${value}) respecto del período anterior`;
  return `${trend === "up" ? "Subió" : "Bajó"} ${value} respecto del período anterior`;
}

const trendVariants = cva("flex items-center gap-1 text-label-sm", {
  variants: {
    trend: {
      up: "text-feedback-positive",
      down: "text-feedback-negative",
      neutral: "text-feedback-neutral",
    },
  },
});

type MetricCardProps = {
  /** Figma: title. Rendered as an h3, under the section's h2. */
  title: string;
  /** Figma: value. Already formatted (1.284, "3,2 %"). null or "" shows "—" (Figma annotation). */
  value: string | null;
  /** Figma: icon (instance swap), an <Icon />. The card sizes it (20px) and colors it. */
  icon: ReactNode;
  /** Figma: state. loading and error never show the trend. */
  state?: "default" | "loading" | "error";
} & (
  | {
      /**
       * Figma: trend. Use only for metrics where going up is good: down is always red.
       * Leave trend and trendValue out for the first period (Figma: showTrend=false).
       */
      trend: Trend;
      /**
       * Figma: trendValue, already formatted ("12%", "4,0 %"). A leading sign is dropped:
       * the arrow and the screen reader text ("Subió…") already say the direction.
       */
      trendValue: string;
    }
  | { trend?: never; trendValue?: never }
);

export function MetricCard({
  title,
  value,
  icon,
  state = "default",
  trend,
  trendValue,
}: MetricCardProps) {
  const loading = state === "loading";
  const error = state === "error";
  const titleId = useId();
  const trendShown = trendValue && withoutSign(trendValue);

  return (
    <article
      aria-labelledby={titleId}
      aria-busy={loading || undefined}
      className="flex min-w-60 flex-col items-start gap-3 rounded-lg border border-border-default bg-bg-surface p-5"
    >
      <div
        aria-hidden="true"
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full text-icon-accent [&_svg]:size-5",
          loading ? "bg-bg-skeleton" : "bg-bg-accent-subtle",
        )}
      >
        {!loading && icon}
      </div>

      {/* The title is a prop, not data: it is there while loading too, so the card keeps
          its name and its place in the heading list. Visible only once loaded (Figma). */}
      <h3 id={titleId} className={cn("w-full text-body-sm text-text-muted", loading && "sr-only")}>
        {title}
      </h3>

      {loading ? (
        <>
          {/* Skeletons with Figma's sizes, so the card doesn't jump when data arrives. */}
          <span aria-hidden="true" className="h-5 w-40 rounded-sm bg-bg-skeleton" />
          <span aria-hidden="true" className="h-9 w-24 rounded-sm bg-bg-skeleton" />
          <span aria-hidden="true" className="h-5 w-12 rounded-sm bg-bg-skeleton" />
          <p className="sr-only">Cargando</p>
        </>
      ) : (
        <>
          {error ? (
            <>
              <p aria-hidden="true" className="text-heading-metric text-text-muted">
                —
              </p>
              <p className="text-body-sm text-text-muted">No se pudo cargar</p>
            </>
          ) : (
            <>
              {/* tabular-nums: Figma annotation. Moves into the text style with #5. */}
              {/* wrap-anywhere: a long number wraps instead of crossing the border at 240px. */}
              {value ? (
                <p className="max-w-full text-heading-metric text-text-default tabular-nums wrap-anywhere">
                  {value}
                </p>
              ) : (
                <p className="text-heading-metric text-text-muted">
                  <span aria-hidden="true">—</span>
                  <span className="sr-only">Sin dato</span>
                </p>
              )}
              {trend && trendShown && (
                <p className={trendVariants({ trend })}>
                  <Icon name={trendIcons[trend]} className="size-3.5" />
                  <span aria-hidden="true">{trendShown}</span>
                  <span className="sr-only">{trendText(trend, trendShown)}</span>
                </p>
              )}
            </>
          )}
        </>
      )}
    </article>
  );
}
