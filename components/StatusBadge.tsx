import { cva } from "class-variance-authority";

/*
  Figma: StatusBadge (02 - Components). The text is fixed per status, not a
  prop, so color and text can never contradict each other. Not clickable.
*/
const labels = {
  active: "Activo",
  paused: "Pausado",
  error: "Error",
} as const;

export type Status = keyof typeof labels;

const badgeVariants = cva(
  // Hug, never wraps or stretches, also inside a table cell (Figma annotation).
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-label-xs whitespace-nowrap",
  {
    variants: {
      status: {
        active: "bg-feedback-positive-subtle text-feedback-positive",
        paused: "bg-feedback-neutral-subtle text-feedback-neutral",
        error: "bg-feedback-negative-subtle text-feedback-negative",
      },
    },
  },
);

type StatusBadgeProps = {
  status: Status;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={badgeVariants({ status })}>
      {/* Decorative: the status is read from the text, not the color. */}
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}
