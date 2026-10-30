// Builds the design tokens from the Figma export in tokens/figma/ with Style Dictionary.
//
//   npm run tokens          → cleans the export and writes the outputs below
//   node scripts/tokens/build.mjs --check
//                           → fails if an output doesn't match the export
//                             (part of `npm run lint`, so hand edits are caught)
//
// Outputs:
//   app/tokens.css          the tokens for Tailwind (:root and @theme)
//   app/tokens/tokens.ts    the same tokens as data, for the /tokens page
//
// The build stops with an error when Figma and code would stop mapping 1 to 1:
// a CSS name that differs from the variable's WEB code syntax, a semantic color
// that isn't an alias, a space/N that isn't N × 4px, or a token the script
// doesn't know how to place.

import { readFile, writeFile } from "node:fs/promises";
import StyleDictionary from "style-dictionary";
import { getReferences, usesReferences } from "style-dictionary/utils";

const SOURCES = ["tokens/figma/variables.tokens.json", "tokens/figma/text-styles.tokens.json"];
const CSS_OUTPUT = "app/tokens.css";
const TS_OUTPUT = "app/tokens/tokens.ts";
const check = process.argv.includes("--check");

// Fields that change on every export even when nothing changed in Figma.
// Removing them keeps the git diff of the export down to real changes.
const VOLATILE = new Set(["exportedAt", "lastSyncedAt"]);

function stripVolatile(node) {
  if (Array.isArray(node)) return node.map(stripVolatile);
  if (node && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node)
        .filter(([key]) => !VOLATILE.has(key))
        .map(([key, value]) => [key, stripVolatile(value)]),
    );
  }
  return node;
}

if (!check) {
  for (const file of SOURCES) {
    const raw = await readFile(file, "utf8");
    const clean = JSON.stringify(stripVolatile(JSON.parse(raw)), null, 2) + "\n";
    if (clean !== raw) await writeFile(file, clean);
  }
}

const errors = new Set();

// Both exports must come from the same Figma file.
const [variablesKey, textStylesKey] = await Promise.all(
  SOURCES.map(async (file) => {
    const { $extensions: meta } = JSON.parse(await readFile(file, "utf8"));
    return meta?.["figma-console-mcp"]?.figmaFileKey ?? meta?.figma?.fileKey;
  }),
);
if (!variablesKey || variablesKey !== textStylesKey) {
  errors.add(`The exports come from different Figma files (${variablesKey} and ${textStylesKey}).`);
}

// Where each token goes, from its path in the export.
function kind(path) {
  const [root, group] = path;
  if (root === "primitives" && ["white", "gray", "blue", "green", "red"].includes(group)) return "primitive-color";
  if (root === "primitives" && group === "radius") return "radius";
  if (root === "primitives" && group === "space") return "space";
  if (root === "semantic" && group === "color") return "semantic-color";
  if (["label", "body", "heading"].includes(root)) return "text-style";
  return "unknown";
}

// Which utility shows a semantic color: its namespace and last word say what
// it paints. color/action/primary/bg → bg-…, color/border/default → border-…
const NAMESPACES = ["bg", "text", "icon", "border", "action", "focus", "feedback"];

function utilityPrefix(path) {
  const [namespace] = path.slice(2);
  const last = path.at(-1);
  if (namespace === "bg") return "bg";
  if (namespace === "text" || namespace === "icon") return "text";
  if (namespace === "border") return "border";
  if (namespace === "focus") return "outline";
  if (namespace === "feedback") return last.endsWith("-subtle") ? "bg" : "text";
  if (namespace === "action") {
    if (last.startsWith("bg")) return "bg";
    if (last === "border") return "border";
    if (last === "text") return "text";
  }
  return null;
}

const rem = (px) => `${px / 16}rem`;
const px = (value) => Number(String(value).replace("px", ""));

// Reads every token once, checks it and sorts it by where it goes.
function collect(dictionary) {
  const data = { primitives: [], colors: [], radii: [], textStyles: [], spacing: [] };

  for (const token of dictionary.allTokens) {
    const type = kind(token.path);
    const figma = token.path.slice(type === "text-style" ? 0 : 1).join("/");
    const original = token.original.$value;
    const note = token.$description ?? null;

    if (type === "unknown") {
      errors.add(`${figma}: unknown token group. Add it to kind() in scripts/tokens/build.mjs.`);
      continue;
    }

    const webSyntax = token.$extensions?.["figma-console-mcp"]?.codeSyntax?.WEB;
    if (webSyntax && webSyntax !== `var(--${token.name})`) {
      errors.add(`${figma}: Figma code syntax is ${webSyntax}, the CSS would be var(--${token.name}).`);
    }

    if (type === "space") {
      // Spacing stays Tailwind's scale (N × 4px), so it is checked, not generated.
      const step = token.path.at(-1).replace("-", ".");
      if (px(original) !== Number(step) * 4) {
        errors.add(`${figma} is ${original}px; Tailwind's p-${step} is ${Number(step) * 4}px.`);
      }
      data.spacing.push({ figma, padding: `p-${step}`, width: `w-${step}`, px: px(original) });
    } else if (type === "primitive-color") {
      data.primitives.push({ name: token.name, value: token.$value });
    } else if (type === "semantic-color") {
      if (!usesReferences(original)) {
        errors.add(`${figma} must point to a primitive in Figma, not hold a value.`);
        continue;
      }
      const [primitive] = getReferences(original, dictionary.tokens);
      const prefix = utilityPrefix(token.path);
      const namespace = token.path[2];
      if (!prefix || !NAMESPACES.includes(namespace)) {
        errors.add(`${figma}: no utility for this color. Add it to utilityPrefix() in scripts/tokens/build.mjs.`);
        continue;
      }
      data.colors.push({
        figma,
        name: token.name,
        namespace,
        utility: `${prefix}-${token.name.replace(/^color-/, "")}`,
        value: token.$value,
        cssPrimitive: primitive.name,
        // Shown with Figma's name (blue/50), so it can be searched in Figma.
        primitive: primitive.path.slice(1).join("/"),
        note,
      });
    } else if (type === "radius") {
      data.radii.push({ figma, name: token.name, utility: `rounded-${token.path.at(-1)}`, px: px(token.$value), note });
    } else if (type === "text-style") {
      const { fontFamily, fontWeight, fontSize, lineHeight } = token.$value;
      if (fontFamily !== "Inter") errors.add(`${figma} uses ${fontFamily}; the app only loads Inter.`);
      data.textStyles.push({
        figma,
        name: token.name,
        utility: token.name,
        size: px(fontSize),
        lineHeight: px(lineHeight),
        weight: fontWeight,
        note,
      });
    }
  }

  data.colors.sort((a, b) => NAMESPACES.indexOf(a.namespace) - NAMESPACES.indexOf(b.namespace));
  data.radii.sort((a, b) => a.px - b.px);
  data.spacing.sort((a, b) => a.px - b.px);
  return data;
}

// Figma name with slashes turned into dashes; the collection name is dropped.
// gray/600 → gray-600 · color/text/muted → color-text-muted · label/md → text-label-md
StyleDictionary.registerTransform({
  name: "name/figma",
  type: "name",
  transform: (token) => {
    if (kind(token.path) === "text-style") return ["text", ...token.path].join("-");
    return token.path.slice(1).join("-");
  },
});

// Hex in lowercase, like the rest of the CSS.
StyleDictionary.registerTransform({
  name: "color/lowercase",
  type: "value",
  filter: (token) => token.$type === "color",
  transform: (token) => String(token.$value).toLowerCase(),
});

const generatedBy = `GENERATED by \`npm run tokens\` from tokens/figma/*.tokens.json. Don't edit:
  change the Figma variable or text style, export again and rebuild
  (how: CLAUDE.md → Design tokens). Figma file ${variablesKey}.`;

StyleDictionary.registerFormat({
  name: "css/tailwind-theme",
  format: ({ dictionary }) => {
    const { primitives, colors, radii, textStyles } = collect(dictionary);
    const lines = (items, line) => items.map(line).join("\n");

    return `/*
  ${generatedBy}
*/

/*
  Primitives: the palette. Plain CSS variables, outside @theme, so they
  don't generate classes: components can't use bg-blue-200 directly.
*/
:root {
${lines(primitives, (p) => `  --${p.name}: ${p.value};`)}
}

@theme {
  /* Only the system exists: Tailwind's colors, radii and font sizes are turned off. */
  --color-*: initial;
${lines(colors, (c) => `  --${c.name}: var(--${c.cssPrimitive});`)}

  --radius-*: initial;
${lines(radii, (r) => (r.px >= 9999 ? `  --${r.name}: 9999px;` : `  --${r.name}: ${rem(r.px)}; /* ${r.px} */`))}

  /* Text styles: one class sets size, line height and weight together. */
  --text-*: initial;
${lines(
  textStyles,
  (t) => `  --${t.name}: ${rem(t.size)}; /* ${t.size} */
  --${t.name}--line-height: ${rem(t.lineHeight)}; /* ${t.lineHeight} */
  --${t.name}--font-weight: ${t.weight};`,
)}
}
`;
  },
});

// The /tokens page reads this list instead of keeping its own copy. Class
// names are written out in full so Tailwind finds them in this file.
StyleDictionary.registerFormat({
  name: "ts/token-reference",
  format: ({ dictionary }) => {
    const { colors, radii, textStyles, spacing } = collect(dictionary);
    const list = (items, fields) =>
      items.map((item) => `  ${JSON.stringify(Object.fromEntries(fields.map((f) => [f, item[f]])))},`).join("\n");

    return `/*
  ${generatedBy}
*/

export type ColorNamespace = ${NAMESPACES.map((n) => JSON.stringify(n)).join(" | ")};

export const colors: {
  figma: string;
  namespace: ColorNamespace;
  utility: string;
  value: string;
  primitive: string;
  note: string | null;
}[] = [
${list(colors, ["figma", "namespace", "utility", "value", "primitive", "note"])}
];

export const textStyles: {
  figma: string;
  utility: string;
  size: number;
  lineHeight: number;
  weight: number;
  note: string | null;
}[] = [
${list(textStyles, ["figma", "utility", "size", "lineHeight", "weight", "note"])}
];

export const radii: { figma: string; utility: string; px: number; note: string | null }[] = [
${list(radii, ["figma", "utility", "px", "note"])}
];

export const spacing: { figma: string; padding: string; width: string; px: number }[] = [
${list(spacing, ["figma", "padding", "width", "px"])}
];
`;
  },
});

const sd = new StyleDictionary({
  source: SOURCES,
  log: { verbosity: "silent" },
  platforms: {
    web: {
      transforms: ["name/figma", "color/lowercase"],
      files: [
        { destination: CSS_OUTPUT, format: "css/tailwind-theme" },
        { destination: TS_OUTPUT, format: "ts/token-reference" },
      ],
    },
  },
});

const outputs = await sd.formatPlatform("web");

if (errors.size) {
  console.error(`Tokens: Figma and code don't map 1 to 1:\n- ${[...errors].join("\n- ")}`);
  process.exit(1);
}

for (const { output, destination } of outputs) {
  if (check) {
    // Line endings are ignored: git may check the file out with CRLF on Windows.
    const current = (await readFile(destination, "utf8").catch(() => "")).replaceAll("\r\n", "\n");
    if (current !== output) {
      console.error(`Tokens: ${destination} doesn't match tokens/figma/. Run \`npm run tokens\` and don't edit it by hand.`);
      process.exit(1);
    }
    console.log(`Tokens: ${destination} matches tokens/figma/.`);
  } else {
    await writeFile(destination, output);
    console.log(`Tokens: wrote ${destination}.`);
  }
}
