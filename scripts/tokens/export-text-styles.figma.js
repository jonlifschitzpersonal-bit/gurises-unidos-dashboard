// Runs INSIDE Figma (Figma Console MCP → figma_execute), not in Node.
// Returns the local text styles as DTCG typography tokens. Save the result
// as tokens/figma/text-styles.tokens.json, then run `npm run tokens`.
// figma_export_tokens only exports variables, so text styles need this.

const weights = { Regular: 400, Medium: 500, "Semi Bold": 600, Bold: 700 };
const px = (n) => `${Math.round(n * 100) / 100}px`;

const tokens = {
  $extensions: { figma: { fileKey: figma.fileKey, source: "local text styles" } },
};

for (const style of await figma.getLocalTextStylesAsync()) {
  const weight = weights[style.fontName.style];
  if (!weight) throw new Error(`${style.name}: unknown font style "${style.fontName.style}"`);
  if (style.lineHeight.unit !== "PIXELS") throw new Error(`${style.name}: line height must be in px`);
  if (style.letterSpacing.value !== 0) throw new Error(`${style.name}: letter spacing is not supported yet`);

  // "label/md" → tokens.label.md
  const path = style.name.split("/");
  let node = tokens;
  for (const key of path.slice(0, -1)) node = node[key] ??= {};
  node[path.at(-1)] = {
    $type: "typography",
    $value: {
      fontFamily: style.fontName.family,
      fontWeight: weight,
      fontSize: px(style.fontSize),
      lineHeight: px(style.lineHeight.value),
    },
    ...(style.description ? { $description: style.description } : {}),
    $extensions: { figma: { styleId: style.id } },
  };
}

return tokens;
