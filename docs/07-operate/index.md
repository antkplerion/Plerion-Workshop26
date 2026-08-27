---
title: Operate
slug: /07-operate
---

# Module 07 — Operate

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

In the Plerion console, go to **Settings > Integrations > Slack**. Connect your workspace and configure which events trigger a notification and which channel they post to.

(placeholder screenshot7-1)

Set it to alert on new critical findings and severity increases. New critical findings will post to your chosen channel with a direct link to the finding and suggested remediation.

---

## 2. Auto-ticketing to Jira

In **Settings > Integrations > Jira**, connect your Jira workspace and configure the trigger rules — which severity levels create tickets, which project they land in, and how they get assigned.

(placeholder screenshot7-2)

Once team ownership is set in Pleri Memory (Module 06), Plerion can assign tickets to the right team automatically based on the resource's owner.

---

## 3. Weekly security digest

Use a Pleri Task to deliver a weekly digest to your team — set it up once and it runs every Monday automatically (covered in Module 06):

- **Prompt:** Give me a weekly security summary — new findings vs resolved, compliance changes, and top three risks to action this week.
- **Schedule:** Every Monday at 8:00 AM
- **Deliver to:** `#security-triage`

Or ask Pleri on demand:

```
Give me a weekly security summary — new findings vs resolved, compliance changes, and top three risks to action this week.
```

---

## 4. Pleri as on-call assistant

Add the Pleri Slack bot to your incident channel. During an incident, ask:

```
@pleri What resources are related to this ARN, who owns them, and what findings are active?
```

Pleri returns asset relationships, ownership, and active findings in seconds — without anyone needing to context-switch to the console mid-incident.

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
- [ ] A weekly digest Task is scheduled
- [ ] You've used Pleri to answer an on-call question

---

Congratulations — you've completed the Plerion Workshop 2026.

Return to [the home page](/) to review any modules, or visit [Plerion Docs](https://docs.plerion.com) to go deeper.
