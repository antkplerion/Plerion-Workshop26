---
title: Prioritize
slug: /03-prioritize
---

# F2 — Prioritize

**Time:** 25 min | **Paths:** Security Engineer

Use risk scores, attack paths, and blast radius to focus remediation effort on what actually matters — not just what CVSS says is critical.

---

## What you'll do

1. Review the risk dashboard and Focus Here list
2. Understand Plerion's graph-powered risk model
3. Explore attack paths and toxic combinations
4. Get a prioritised remediation queue via Pleri

---

## 1. Risk dashboard

Open **Risk** in the Plerion console.

![Risk dashboard](/img/00-setup/screenshot3-1.png)

The dashboard surfaces two things immediately:

**Top Risks** — your highest-scoring issues ranked by combined severity, exploitability, and blast radius. These are not just the findings with the highest CVSS score. A medium-severity misconfiguration on an internet-facing asset with broad data access will rank above a critical finding buried in a private, isolated environment.

**Focus Here** — a curated shortlist of the issues Plerion considers most urgent right now. This list is opinionated: it factors in whether an exploit exists in the wild, whether the affected asset is reachable from the internet, and how much of your environment would be exposed if the issue were exploited. It's designed to answer "where do I start today?" without requiring you to read through hundreds of findings.

From the CLI:

```bash
# Top risks sorted by score
plerion risks list --sort-by score --sort-order desc

# Risks on a specific integration
plerion risks list --severity CRITICAL --sort-by score --sort-order desc
```

---

## 2. The graph engine

Everything in the risk dashboard is powered by Plerion's graph engine. Rather than evaluating findings in isolation, Plerion builds a graph of your entire cloud environment — assets, IAM relationships, network paths, data stores, and findings — and reasons across all of it.

This is what makes the scoring meaningful:

- An S3 bucket with public access scores higher than one that's misconfigured but private, because the graph shows the blast radius is larger
- An EC2 instance with a critical CVE scores lower if the graph shows it has no outbound internet access and no IAM permissions worth escalating
- A medium-severity finding on an IAM role that can assume admin-equivalent roles scores higher because the graph traces where that privilege escalation goes

The graph is what turns a list of findings into a risk picture.

---

## 3. Attack paths

Attack paths are where the graph engine becomes most visible. An attack path strings together a sequence of issues — individually not alarming, but together forming a route from an exposed entry point to a high-value target.

![Attack path](/img/00-setup/screenshot3-2.png)

A typical toxic combination might look like:

1. EC2 instance is internet-facing with an unpatched vulnerability
2. The instance's IAM role has `s3:GetObject` on a bucket containing secrets
3. That bucket's access policy allows cross-account reads to an unrelated account

No single finding here is necessarily critical on its own. Together they form a path from the internet to credential exfiltration. Plerion surfaces this as one attack path with a combined risk score.

**Console:** Open **Attack Paths**, click any path, and step through the nodes. Each node shows the finding, the asset, and why it's part of the chain.

**Pleri:**
```
Show me all attack paths that reach data stores in my account.
```

```
Are there any attack paths that start from internet-facing assets and end at IAM roles with admin access?
```

---

## 4. Get a prioritised remediation queue

Once you understand the risk picture, Pleri can turn it into an actionable list.

**On demand via Pleri MCP** — ask directly in Claude Code or your IDE:

```
Give me the top 5 findings I should fix this week, ranked by risk and ease of remediation. Include the affected resource and a one-line summary of the fix for each.
```

Pleri combines risk score, exploitability, and fix complexity to give you an ordered list with rationale — ready to paste into a ticket.

**As a recurring Task** — if you want this automatically every week, set it up in Pleri Tasks (covered in Module 06):

- **Prompt:** Give me the top 10 risks to address this week, ranked by score. For each, include the resource, the finding, the suggested fix, and the owning team.
- **Schedule:** Every Monday at 8:00 AM
- **Deliver to:** `#security-triage` Slack channel

This gives your team a standing weekly agenda — a pre-prioritised list to cut tickets from and raise fixes against, without anyone having to manually query the platform.

---

## Verify

- [ ] You've reviewed the risk dashboard and Focus Here list
- [ ] You can explain how the graph engine affects risk scoring
- [ ] You've stepped through at least one attack path end to end
- [ ] Pleri has given you a ranked remediation queue

---

Next: [Module 04 — Fix](/04-fix)
