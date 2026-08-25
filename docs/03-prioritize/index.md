---
title: Prioritize
slug: /03-prioritize
---

# Module 03 — Prioritize

**Time:** 25 min | **Paths:** Security Engineer

Use risk scores, attack paths, and blast radius to focus remediation effort on what actually matters — not just what CVSS says is critical.

---

## What you'll do

1. Review the risk dashboard
2. Understand Plerion's risk scoring model
3. Explore attack paths from the internet to sensitive data
4. Use Pleri to get a prioritised remediation queue

---

## 1. Risk dashboard

Open **Risk** in the Plerion console. The dashboard shows:

- Top risks by score
- Resources with the highest blast radius
- Active attack paths

```bash
plerion risks list --severity critical --limit 10
```

---

## 2. Risk scoring model

Plerion scores risk on three axes:

| Factor | What it measures |
|--------|-----------------|
| **Severity** | How bad the finding is in isolation |
| **Exploitability** | Whether there's a known path to exploit it |
| **Blast radius** | How much damage could result if exploited |

A public S3 bucket scores higher than a private one with the same misconfiguration because the blast radius is larger.

---

## 3. Explore attack paths

Attack paths show exactly how an attacker could move from an exposed entry point to a high-value target.

```bash
plerion attack-paths list
plerion attack-paths get --id <PATH_ID>
```

### Two Ways

**Console:** Open **Attack Paths**, click a path, step through the nodes.

**Pleri:**
```
Show me all attack paths that reach production databases in my account.
```

---

## 4. Get a prioritised queue

```
Pleri, give me the top 5 findings I should fix this week, ranked by risk and ease of remediation.
```

Pleri combines risk score, exploitability, and fix complexity to give you an ordered list with rationale.

---

## Verify

- [ ] You've reviewed the risk dashboard
- [ ] You can explain the three scoring axes
- [ ] You've stepped through at least one attack path end to end
- [ ] Pleri has given you a ranked remediation queue

---

Next: [Module 04 — Fix](/04-fix)
