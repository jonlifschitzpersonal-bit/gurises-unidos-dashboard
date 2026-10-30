import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
  Figma: Button (02 - Components), 24 variants = variant × size × state.
  In code, state is not a prop: hover, focus and pressed are browser states
  (:hover, :focus-visible, :active) and disabled is the native attribute.
  Pressed has no variant in Figma; its color is in the Button annotation.
*/
const buttonVariants = cva(
  [
    // Auto Layout: horizontal, centered, Hug. Width comes from the content.
    // The label wraps only when the container is narrower than it (no scroll at 320px).
    "relative inline-flex cursor-pointer items-center justify-center text-center",
    // The icon arrives through a prop (instance swap): the Button sizes it.
    "[&_svg]:size-4 [&_svg]:shrink-0",
    // Focus ring: 2px outside stroke in Figma.
    "focus-visible:outline-2 focus-visible:outline-focus-ring",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-action-primary-bg text-text-default",
          "hover:bg-action-primary-bg-hover active:bg-action-primary-bg-pressed",
          "disabled:bg-action-disabled-bg disabled:text-text-disabled",
        ],
        secondary: [
          // Inside stroke that doesn't add to the 40px height: an inset ring, not a border.
          "text-action-secondary-text inset-ring inset-ring-action-secondary-border",
          "hover:bg-action-subtle-bg-hover active:bg-action-subtle-bg-pressed",
          // In Figma the focus ring replaces the border.
          "focus-visible:inset-ring-0",
          "disabled:bg-transparent disabled:text-text-disabled disabled:inset-ring-action-disabled-bg",
        ],
        ghost: [
          "text-text-default",
          "hover:bg-action-subtle-bg-hover active:bg-action-subtle-bg-pressed",
          "disabled:bg-transparent disabled:text-text-disabled",
        ],
      },
      size: {
        // 10 + 20 (line height) + 10 = 40px, as in Figma.
        md: "gap-2 rounded-md px-4 py-2.5 text-label-md",
        // 6 + 20 + 6 = 32px.
        sm: "gap-1.5 rounded-sm px-3 py-1.5 text-label-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = Omit<ComponentProps<"button">, "children"> &
  VariantProps<typeof buttonVariants> & {
    /** The label (Figma: label). */
    children: ReactNode;
    /** Icon before the label (Figma: iconStart + showIconStart). Usually an <Icon />. */
    iconStart?: ReactNode;
    /**
     * Shows a spinner, can't be pressed again and keeps its width.
     * Unlike disabled, it stays focusable, so focus isn't lost while it works.
     */
    loading?: boolean;
  };

export function Button({
  variant,
  size,
  iconStart,
  loading = false,
  className,
  children,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  // With an icon, the spinner takes its place. Without one, it covers the
  // label, which stays (transparent) so the width doesn't change. opacity-0,
  // not invisible: visibility: hidden would also remove the button's name.
  const spinnerCoversLabel = loading && !iconStart;

  return (
    <button
      // Spread first, so a consumer can't override the loading attributes below.
      {...props}
      // While loading, pressing it again does nothing: no click handler, and it
      // no longer submits its form. Enter in a text field can still submit the
      // form (implicit submission), so a form ignores submits while it's busy.
      // No wrapper function, so the Button also works in server components.
      type={loading ? "button" : type}
      aria-disabled={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={cn(
        buttonVariants({ variant, size }),
        loading && "pointer-events-none",
        className,
      )}
    >
      {loading ? <Spinner className={spinnerCoversLabel ? "absolute" : undefined} /> : iconStart}
      {spinnerCoversLabel ? <span className="opacity-0">{children}</span> : children}
      {/* The leading space keeps the name "Guardar, cargando" apart for screen readers. */}
      {loading && <span className="sr-only">, cargando</span>}
    </button>
  );
}

/** Figma: spinner layer, a 270° ring 2px thick. Spins only without reduced motion. */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={cn("motion-safe:animate-spin", className)}
    >
      {/* r = 7: the ring's 2px stroke ends at the 16px edge. Dash = ¾ of 2π·7. */}
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="33 44" />
    </svg>
  );
}
