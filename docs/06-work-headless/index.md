---
title: Work Headless
slug: /06-work-headless
---

# Module 06 — Work Headless

**Time:** 20 min | **Paths:** Platform Engineer

Drive Plerion from the CLI and Pleri MCP — automate queries, pipe findings into scripts, and integrate security data into your existing engineering workflows without touching the console.

---

## What you'll do

1. Query findings and assets from the CLI
2. Pipe output into scripts for automation
3. Query the audit log
4. Use Pleri MCP as a headless security interface

---

## 1. Query findings from the CLI

The `plerion` CLI supports `--output json` on every command, making it straightforward to pipe into any script, CI step, or downstream tool.

```bash
# All critical and high failures, sorted by severity
plerion findings list \
  --severity CRITICAL,HIGH \
  --status FAILED \
  --sort-by severityLevel \
  --sort-order desc \
  --output json

# Findings for a specific service
plerion findings list --service s3 --status FAILED --output json

# Findings in a specific region
plerion findings list --region ap-southeast-2 --severity CRITICAL --output json

# Fetch all pages automatically
plerion findings list --severity CRITICAL --status FAILED --all --output json
```

---

## 2. Query assets from the CLI

```bash
# All publicly exposed assets
plerion assets list --is-publicly-exposed --output json

# Vulnerable assets with a known exploit
plerion assets list --is-vulnerable --has-exploit --output json

# Assets by service and region
plerion assets list --service ec2 --region ap-southeast-2 --output json

# Get full detail on a specific asset
plerion assets get --asset-id <ASSET_ID> --output json
```

---

## 3. Pipe into scripts

Because every command outputs clean JSON, you can pipe directly into `jq` or any other tool:

```bash
# Count critical findings by resource type
plerion findings list --severity CRITICAL --status FAILED --all --output json \
  | jq 'group_by(.resourceType) | map({type: .[0].resourceType, count: length}) | sort_by(.count) | reverse'

# List just the names of publicly exposed assets
plerion assets list --is-publicly-exposed --all --output json \
  | jq '.[].name'

# Check integrations and their status
plerion integrations list --output json
```

For recurring automation — daily digests, CI pipeline gates, pre-deploy checks — wrap these in a shell script and schedule with cron or your CI platform of choice.

---

## 4. Audit log

Every action in Plerion — findings resolved, integrations added, users invited — is recorded in the audit log:

```bash
plerion audit-logs list --output json
```

Useful for compliance evidence, incident investigation, or feeding into a SIEM.

---

## 5. Pleri MCP as a headless interface

For queries that are harder to express as CLI flags — complex correlations, natural language filtering, cross-resource analysis — use Pleri MCP directly from your terminal via Claude Code:

```
Which EC2 instances have both a critical finding and are internet-facing?
```

```
Write a bash script that queries Plerion for all critical findings created in the last 24 hours and posts a summary to a Slack webhook.
```

```
Generate a JSON payload of all failed S3 findings suitable for importing into our ticketing system.
```

Pleri has access to the full Plerion dataset and can generate scripts, format outputs, and chain queries that would be verbose to write in raw CLI.

---

## Verify

- [ ] You've queried findings and assets from the CLI with JSON output
- [ ] You've piped output into `jq` or a script
- [ ] You've checked the audit log
- [ ] You've used Pleri MCP to answer a headless query

---

Next: [Module 07 — Teach Pleri](/07-teach-pleri)
