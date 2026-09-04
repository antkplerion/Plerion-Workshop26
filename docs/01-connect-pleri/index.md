---
title: Connect Pleri
slug: /01-connect-pleri
---

# W2 — Connect Pleri

**Time:** 15 min | **Paths:** Platform Engineer

Connect Pleri AI to Claude Code, your IDE, and any MCP-compatible tool so you can query your cloud security posture from wherever you work.

Public Documentation for setup here: https://docs.pleri.ai/tools/mcp 

---

## What you'll do

1. Generate a Pleri API key
2. Add Pleri as an MCP server in Claude Code
3. Test a query from Claude Code
4. (Optional) Add to Cursor or another IDE

---

## 1. Generate an API key

In the Plerion console: **Settings > API Keys > Generate Key**

Give it a name (e.g. `claude-code-local`) and copy the key.

```bash
export PLERI_API_KEY=pleri_...
```

---

## 2. Add Pleri MCP to Claude Code

Add the server to your Claude Code config:

```json
{
  "mcpServers": {
    "pleri": {
      "command": "pleri",
      "args": ["mcp"],
      "env": {
        "PLERI_API_KEY": "pleri_..."
      }
    }
  }
}
```

Or use the CLI shortcut:

```bash
pleri mcp install --client claude-code
```

Restart Claude Code. You should see Pleri tools available in the tool list.

---

## 3. Test a query

Open Claude Code and ask:

```
What are my top 5 critical findings right now?
```

or

```
Which S3 buckets in my account are publicly accessible?
```

Claude will call the Pleri MCP tools and return live data from your Plerion tenant.

---

## Verify

- [ ] Pleri MCP is listed in Claude Code's tool panel
- [ ] A natural-language query returns live findings from your account

---

Next: [Module 02 — See](/02-see)
