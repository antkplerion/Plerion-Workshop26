---
title: Teach Pleri
slug: /06-teach-pleri
---

# Module 06 — Teach Pleri

**Time:** 20 min | **Paths:** Platform Engineer

Pleri gets more useful the more it knows about your organisation. This module covers the three extensibility primitives: Skills, Memory, and Tasks.

---

## What you'll do

1. Install a Skill to connect Pleri to an external tool
2. Set company memory so Pleri understands your environment
3. Create a Task to schedule a recurring Pleri query

---

## 1. Skills

Skills connect Pleri to external data sources and tools — Jira, Vanta, Drata, Linear, custom MCP servers, and more. Once installed, Pleri can read from and act on those systems in the same conversation as your cloud security data.

In the Pleri console, go to **Skills**. You'll see:

- **Installed** — skills already active in your workspace
- **Templates** — pre-built skills you can install in one click

![Skills page](/img/00-setup/screenshot7-1.png)

### Install a template skill

Browse the template library and click **Install** on a skill your team uses (e.g. Jira, Linear, or Vanta).

Follow the OAuth or API key prompt. Once connected, Pleri can answer questions like:

```
Create a Jira ticket for each of my open critical findings and assign it to the security team.
```

### Add a custom MCP server

If your tooling isn't in the template library, add it as a custom MCP server:

1. In **Skills**, click **Add Skill**
2. Choose **MCP Server**
3. Paste your server URL and any required credentials
4. Click **Validate** — Pleri will test the connection before saving

![Add custom MCP server](/img/00-setup/screenshot7-2.png)

---

## 2. Memory

Memory is how you teach Pleri about your organisation. Without it, Pleri gives generic cloud security answers. With it, Pleri knows who owns what, what your environments mean, and what your risk priorities are.

There are two levels:

| Level | Scope | What to put here |
|-------|-------|-----------------|
| **User memory** | Your account only | Your role, preferred output format, recurring questions |
| **Memory** | All users in your tenant | Team ownership, environment definitions, risk tolerance, contacts |

### Set memory

In the Pleri console, go to **Settings > Memory**.

Write plain English — Pleri reads this as context before every response:

```
Production is defined as any account tagged Environment=production.
The payments team owns all resources tagged Team=payments. Their on-call contact is payments-oncall@company.com.
Our primary AWS region is ap-southeast-2. Findings in us-east-1 are lower priority unless severity is CRITICAL.
We do not use RDS in production — any RDS finding in a production account is a misconfiguration.
```

![Memory settings](/img/00-setup/screenshot7-3.png)

Once saved, test it:

```
Which teams have open critical findings right now?
```

Before memory, Pleri returns ARNs. After, it returns team names, owners, and contact details.

---

## 3. Tasks

Tasks let you schedule Pleri to run a query on a recurring basis — a weekly digest, a daily check on new criticals, or a report before a board meeting.

In the Pleri console, go to **Tasks**.

![Tasks list](/img/00-setup/screenshot7-4.png)

### Create a recurring task

Click **New Task** and fill in what you want Pleri to do and when:

- **Name:** Weekly critical findings digest
- **Prompt:** Summarise all new critical findings from the past 7 days. Group by team owner. List the top 3 risks to fix this week.
- **Schedule:** Every Monday at 8:00 AM

Pleri runs the query on schedule and delivers the result to your configured channel (Slack or email).

### Run a task on demand

Any task can also be triggered immediately from the Tasks list — useful for testing before you schedule it, or for one-off reports.

---

## Verify

- [ ] At least one skill is installed and Pleri can answer a question using it
- [ ] Company memory is set and Pleri references team context in its answers
- [ ] A scheduled task is created and has run at least once

---

Next: [Module 07 — Operate](/07-operate)
