import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { textStyles } from "@/app/tokens/tokens";

/*
  tailwind-merge drops the earlier of two classes that set the same property,
  so a className passed to a component can override its defaults.
  It only knows Tailwind's default font sizes: without this, the text styles
  (text-label-md) look like text colors (text-text-muted) and one of the two
  is dropped. The list comes from the tokens generated from Figma.
*/
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: textStyles.map((style) => style.utility.replace(/^text-/, "")) },
      ],
    },
  },
});

/** Joins class names (with conditions) and resolves conflicts between them. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
