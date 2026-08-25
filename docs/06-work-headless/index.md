---
title: Work Headless
slug: /06-work-headless
---

# Module 06 — Work Headless

**Time:** 20 min | **Paths:** Platform Engineer

Drive Plerion from the API and CLI — automate queries, pipe findings into scripts, export data, and create tickets without touching the console.

---

## What you'll do

1. Authenticate with the Plerion API
2. Query findings via the REST API
3. Pipe findings into a shell script
4. Create a ticket automatically on new critical findings

---

## 1. Authenticate

```bash
export PLERION_API_KEY=plerion_...

# Test auth
curl -s https://api.plerion.com/v1/tenant/me \
  -H "Authorization: Bearer $PLERION_API_KEY" | jq .
```

---

## 2. Query findings via REST

```bash
# All critical findings
curl -s "https://api.plerion.com/v1/tenant/findings?severity=critical" \
  -H "Authorization: Bearer $PLERION_API_KEY" | jq '.findings[].title'

# Findings on a specific resource
curl -s "https://api.plerion.com/v1/tenant/findings?resourceArn=arn:aws:s3:::bad-cloud-public-bucket" \
  -H "Authorization: Bearer $PLERION_API_KEY" | jq .
```

---

## 3. CLI automation

```bash
# Export findings as JSON
plerion findings export --severity critical --format json > findings.json

# Count by severity
plerion findings list --format json | jq 'group_by(.severity) | map({severity: .[0].severity, count: length})'
```

---

## 4. Auto-create tickets on new criticals

A simple webhook receiver that creates a Jira ticket for each new critical finding:

```bash
# Using the Plerion CLI webhook command
plerion webhooks create \
  --event finding.created \
  --filter severity=critical \
  --url https://your-webhook-receiver.example.com/plerion
```

Or use Pleri to generate the integration:

```
Write a script that polls Plerion for new critical findings every 15 minutes and creates a Linear ticket for each one.
```

---

## 5. Scheduled report

```bash
# Daily critical findings digest — add to cron
plerion findings export \
  --severity critical \
  --since 24h \
  --format csv \
  --output /tmp/daily-findings-$(date +%Y%m%d).csv
```

---

## Verify

- [ ] `curl` against the API returns your findings
- [ ] You've exported findings as JSON
- [ ] A webhook or script creates tickets automatically
- [ ] No API keys committed to source control

---

Next: [Module 07 — Teach Pleri](/07-teach-pleri)
