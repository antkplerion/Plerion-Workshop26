---
title: Operate
slug: /07-operate
---

# W3 — Operate

**Time:** 20 min | **Paths:** Security Engineer, Platform Engineer

The goal of this module is to make Plerion part of how your team works day-to-day — not something people log into once a week. That means getting findings into the channels your team already watches, tickets into the system they already manage, and Pleri into the conversations they're already having.

---

## What you'll do

1. Set up Slack alerts for new critical findings
2. Configure auto-ticketing to Jira
3. Schedule a weekly security digest
4. Use Pleri as an on-call assistant

---

## 1. Slack alerts

In the Plerion console, go to **Settings > Integrations > Slack** and connect your workspace.

![Slack integration](/img/00-setup/screenshot7-operate-1.png)

Configure which events post to which channel. A good starting point:

- **Channel:** `#security-alerts`
- **Events:** New finding created, finding severity increased
- **Filter:** Critical and High severity only

When a new critical finding is detected, Plerion posts to the channel with the finding name, affected resource, severity, and a direct link into the console. The team sees it without opening Plerion.

You can verify your configured alerts from the CLI:

```bash
plerion alerts list --output json
```

---

## 2. Auto-ticketing to Jira

In **Settings > Integrations > Jira**, connect your Jira workspace and set the trigger rules.

![Jira integration](/img/00-setup/screenshot7-operate-2.png)

Configure:
- **Trigger:** New finding at Critical or High severity
- **Project:** Your security or engineering backlog
- **Assignment:** Based on resource owner from Pleri Memory (Module 06)

With ownership set in Memory, Plerion assigns the ticket to the right team automatically — the payments team gets payments infrastructure tickets, the platform team gets platform tickets. No manual triage required.

This closes the loop: findings surface in Slack so nothing is missed, and tickets get created and assigned so nothing sits unowned.

---

## 3. Weekly security digest

Rather than asking your team to check a dashboard, push a summary to them. Set up a Pleri Task (Module 06) to run every Monday morning:

- **Prompt:** Give me a weekly security summary — new critical and high findings from the past 7 days, findings resolved, compliance posture change, and the top 3 risks to action this week. Group by owning team.
- **Schedule:** Every Monday at 8:00 AM
- **Deliver to:** `#security-triage`

This gives the team a standing agenda at the start of each week — what's new, what's been fixed, what needs attention — without anyone having to pull the report manually.

On demand, ask Pleri directly:

```
Give me a weekly security summary — new findings vs resolved, compliance changes, and top three risks to action this week.
```

---

## 4. Pleri as on-call assistant

Add the Pleri Slack bot to your incident channel. When something breaks and your team is triaging, they can ask:

```
@pleri What findings are active on arn:aws:ec2:ap-southeast-2:123456789:instance/i-abc123?
```

```
@pleri Who owns the resources in the payments VPC and what critical findings are on them?
```

```
@pleri Has anything changed in our security posture in the last 24 hours?
```

Pleri returns asset context, ownership, and active findings in seconds. The person on call gets the information they need without leaving Slack or switching to the console mid-incident.

---

## 5. The weekly security rhythm

The integrations above support a simple operating cadence that keeps security visible without it becoming a separate workstream:

| Day | Activity |
|-----|----------|
| Monday | Weekly digest lands in `#security-triage` — review, assign new criticals |
| Wednesday | Check open ticket progress; Pleri for a mid-week status |
| Friday | Ask Pleri what improved and what's stalled; update stakeholders |

Security runs in the background continuously. The team engages with it at predictable times, through the tools they already use.

---

## Verify

- [ ] Slack is receiving alerts for new critical findings
- [ ] Jira tickets are being created and assigned to the right teams
- [ ] A weekly digest Task is scheduled and has delivered at least once
- [ ] You've used the Pleri Slack bot to answer an on-call question

---

Congratulations — you've completed the Plerion Workshop 2026.

Return to [the home page](/) to review any modules, or visit [Plerion Docs](https://docs.plerion.com) to go deeper.
