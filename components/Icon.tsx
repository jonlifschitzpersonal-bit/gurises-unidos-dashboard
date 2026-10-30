import {
  Check,
  DollarSign,
  Info,
  Minus,
  MoveDown,
  MoveRight,
  MoveUp,
  Package,
  Percent,
  Plus,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

/*
  Figma: Icon (02 - Components). 16×16, 1.5px stroke, based on Lucide.
  Keys are the Figma names; where Lucide's name differs, the equivalence comes
  from the set's description in Figma (checked by shape, not by name).
*/
const icons = {
  plus: Plus,
  "arrow-right": MoveRight,
  check: Check,
  "arrow-up": MoveUp,
  "arrow-down": MoveDown,
  minus: Minus,
  users: Users,
  currency: DollarSign,
  percent: Percent,
  package: Package,
  info: Info,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

type IconProps = {
  name: IconName;
  /**
   * Only when the icon means something on its own (no text next to it).
   * Without it the icon is decorative and hidden from screen readers.
   * In an icon-only button, the name goes on the button (aria-label), not here.
   */
  label?: string;
  className?: string;
};

export function Icon({ name, label, className }: IconProps) {
  const Svg = icons[name];
  return (
    <Svg
      data-slot="icon"
      // Real 1.5px at any size: globals.css keeps the stroke from scaling.
      strokeWidth={1.5}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      // Stroke uses currentColor: the icon takes the text color of its parent.
      className={cn("size-4 shrink-0", className)}
    />
  );
}
