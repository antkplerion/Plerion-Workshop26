---
title: Operate
slug: /08-operate
---

# Module 08 — Operate

**Time:** 20 min | **Paths:** Security Engineer, Platform Engineer

Wire Plerion into your team's daily operations — alerting, ticketing, runbooks, and the weekly security rhythm.

---

## What you'll do

1. Set up Slack alerts for new critical findings
2. Configure auto-ticketing to Jira
3. Build a weekly security digest
4. Use Pleri as an on-call assistant

---

## 1. Slack alerts

In **Settings > Integrations > Slack**, connect your workspace and configure:

```bash
plerion integrations slack configure \
  --channel "#security-alerts" \
  --events "finding.created,finding.severity_increased" \
  --filter "severity=critical"
```

New critical findings now post to `#security-alerts` with a direct link to the finding and suggested remediation.

---

## 2. Auto-ticketing to Jira

```bash
plerion integrations jira configure \
  --project SECURITY \
  --issue-type Bug \
  --trigger "finding.created" \
  --filter "severity=critical,severity=high" \
  --assignee-from-context true
```

With `--assignee-from-context true`, Plerion assigns the ticket to the team owner set in Module 07.

---

## 3. Weekly security digest

Use the Plerion scheduled report feature:

```bash
plerion reports schedule \
  --name "Weekly Security Digest" \
  --cadence weekly \
  --day monday \
  --time 08:00 \
  --recipients "security-team@company.com" \
  --include "new-findings,resolved-findings,compliance-delta,top-risks"
```

Or use Pleri to generate the digest on demand:

```
Pleri, give me a weekly security summary — new findings vs resolved, compliance changes, and top three risks to action this week.
```

---

## 4. Pleri as on-call assistant

Add Pleri to your on-call runbook:

1. Add the Pleri Slack bot to your incident channel
2. During an incident, ask:
   ```
   @pleri What resources are related to this ARN, who owns them, and what findings are active?
   ```
3. Pleri returns asset relationships, ownership, and active findings in seconds — without context-switching to the console.

---

## 5. The weekly security rhythm

| Day | Activity |
|-----|----------|
| Monday | Review weekly digest, assign new criticals |
| Wednesday | Check remediation progress on open tickets |
| Friday | Pleri summary: what's improved, what's stalled |

---

## Verify

- [ ] Slack is receiving alerts for new critical findings
- [ ] Jira tickets are being created and assigned automatically
- [ ] A weekly report is scheduled
- [ ] You've used Pleri to answer an on-call question

---

Congratulations — you've completed the Plerion Workshop 2026.

Return to [the home page](/) to review any modules, or visit [Plerion Docs](https://docs.plerion.com) to go deeper.
