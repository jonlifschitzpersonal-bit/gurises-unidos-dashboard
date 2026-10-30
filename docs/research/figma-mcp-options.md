# Figma MCP options on the Starter plan

Checked on 2026-10-29 against the Figma file of this project (Starter plan).

| | Official Figma MCP | Figma Console MCP |
|---|---|---|
| Cost | Included in the Figma plan | Free, open source (Southleft) |
| Limit on Starter | 6 calls per month | None |
| Reads layers, properties, variables | Yes | Yes, through the Desktop Bridge plugin |
| Writes to the canvas | No | Yes |
| Reads comments | — | Yes, with a personal Figma token |
| Needs Figma Desktop open | No | Yes |

Other plan limits that affect the workflow:

- **Variable modes:** one mode per collection on Starter (Figma answers "Limited to 1 modes only"). Dark mode is defined in code.
- **Variables REST API:** Enterprise only. Variables are read with the plugin.
- **Code Connect:** Organization or Enterprise only. The Figma ↔ code mapping is documented by hand.
- **Annotations:** native annotations are only visible in Dev Mode. Each one is also added as a visible note in an `annotations` frame.

Leads to [ADR 0003](../adr/0003-figma-console-mcp.md).
