# 0003. Figma Console MCP to read and write Figma

- **Status:** Accepted
- **Date:** 2026-10-29

## Context

The agent needs to read the Figma file (layers, component properties, variables, annotations) to implement it without guessing, and sometimes write to it (create a token, fix a component). The file is on Figma's Starter plan. Details: [`research/figma-mcp-options.md`](../research/figma-mcp-options.md).

## Options considered

1. **Official Figma MCP.** On Starter it allows 6 calls per month and can't write to the canvas (checked on 2026-10-29). Not enough for day-to-day work.
2. **Figma Console MCP** (Southleft, open source). Works on any plan through the Desktop Bridge plugin: reads and writes the canvas, reads local variables and, with a personal token, comments.
3. **Screenshots and manual specs.** No structure: the agent would guess names, tokens and states.

## Decision

Figma Console MCP, with Figma Desktop open and the Desktop Bridge plugin running.

## Consequences

- Reading Figma requires Figma Desktop open on the same machine.
- Code Connect is not available on Starter: the Figma ↔ code mapping is documented by hand.
- The Figma Variables REST API is Enterprise only; variables are read through the plugin.
