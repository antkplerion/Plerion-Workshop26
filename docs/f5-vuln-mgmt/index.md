---
title: Vulnerability Management
slug: /f5-vuln-mgmt
---

# F5 — Vulnerability Management

**Time:** 30 min | **Paths:** Security Engineer

Most vulnerability programmes drown in noise. Scanners report thousands of CVEs, dashboards fill with critical findings, and engineers spend their time triaging rather than fixing. This module covers how to cut that noise — filter for what's actually exploitable, separate what's actionable from what isn't, and connect the remainder to your patch cycle with meaningful SLAs.

---

## What you'll do

1. Understand how Plerion scores and filters vulnerabilities
2. Analyse exploitability to separate signal from noise
3. Learn the actionability framework — what to fix vs what to ignore
4. Define SLA tiers based on severity and exploitability
5. Build a patch cycle workflow with Pleri

---

## 1. How Plerion surfaces vulnerabilities

Plerion continuously scans your cloud workloads — EC2 instances, containers, Lambda functions, and ECR images — and maps detected packages and runtime components against the National Vulnerability Database and known exploit feeds.

Open **Vulnerabilities** in the Plerion console to see your full finding set.

From the CLI:

```bash
plerion vulnerabilities list --severity CRITICAL --sort-by severityLevelValue --sort-order desc --per-page 3
```

Out of the box, this list will be long. The work of vulnerability management is not reading it top to bottom — it's deciding which subset of it you're going to act on, and when.

---

## 2. Exploitability analysis

Not every CVE is equally dangerous. A CVSS 9.8 with no public exploit and no reachable path into your environment is less urgent than a CVSS 7.0 with an active exploit kit and an internet-facing entry point.

Plerion layers three signals to score exploitability:

| Signal | What it tells you |
|--------|-------------------|
| **EPSS score** | Probability that this CVE will be exploited in the next 30 days, based on threat intelligence and historical data. Filter for vulnerabilities with any known exploit using `--has-exploit`. |
| **KEV presence** | Whether CISA has added this CVE to the Known Exploited Vulnerabilities catalogue — meaning it is being actively exploited in the wild |
| **Reachability** | Whether the affected asset has an internet-facing path, an IAM role worth escalating, or sits in a blast radius that includes sensitive data |

These three signals combine into a single exploitability score per finding. Use this to slice your queue.

Findings with active exploitation (KEV) only:

```bash
plerion vulnerabilities list --has-kev
```

Findings with a known public exploit:

```bash
plerion vulnerabilities list --has-exploit
```

Critical findings that are KEV-listed and have an exploitable path:

```bash
plerion vulnerabilities list --severity CRITICAL --has-kev --is-exploitable
```

**Ask Pleri:**
```
Which of our critical CVEs are in the CISA KEV catalogue and on internet-facing assets?
```

```
Show me our top 10 vulnerability findings ranked by exploitability score, not CVSS.
```

---

## 3. The actionability framework

Exploitability tells you what's dangerous. Actionability tells you what you can actually fix. These are different questions, and conflating them is where most programmes get stuck.

### What's actionable

**Language and application packages** are the highest-value target for vulnerability management. These are dependencies your team controls directly — a version bump in a `package.json`, `requirements.txt`, `go.mod`, or `pom.xml` is a change you can make today, test, and ship without coordinating with infrastructure.

| Package ecosystem | How to fix |
|---|---|
| npm / yarn | Bump version in `package.json`, run `npm audit fix` |
| pip / poetry | Update `requirements.txt` or `pyproject.toml` |
| Go modules | Update `go.mod`, run `go mod tidy` |
| Maven / Gradle | Update dependency version in build file |
| gem (Ruby) | Update `Gemfile`, run `bundle update` |

Plerion can generate a fix PR directly for these (covered in F3 — Fix). These are the findings your patch cycle should be built around.

**Container base images** are semi-actionable. If your `Dockerfile` pins to `ubuntu:20.04` and that image has known CVEs, you can rebuild against a patched version. The fix is a one-line change and a pipeline run. Worth doing on a regular cadence — not an emergency for every CVE, but don't let base image debt accumulate for months.

### What's not actionable

**Kernel vulnerabilities** — if a CVE affects the Linux kernel, you are almost certainly not going to patch it. In cloud environments, the kernel is either managed by the cloud provider (EKS node groups, ECS, Lambda) or it lives in an AMI that was built once and doesn't get live kernel patches. Triaging individual kernel CVEs as if they're fixable is a waste of time.

**What to do instead:** Ensure your AMI or base node image is rebuilt on a regular schedule (weekly or monthly) from a patched source. Then suppress kernel CVEs in Plerion for assets where the AMI rebuild cadence is your control — they're handled at the image layer, not the finding layer.

```bash
# Exempt a vulnerability — managed via AMI rebuild cadence
plerion vulnerabilities exemptions create \
  --profile-id <PROFILE_ID> \
  --name "Kernel CVEs - AMI rebuild managed" \
  --reason COMPENSATING_CONTROL \
  --conditions '{"vulnerabilityIds": ["<VULNERABILITY_ID>"]}' \
  --audit-note "Kernel CVE managed via AMI rebuild cadence"
```

**Cloud provider managed components** — RDS, ElastiCache, managed Kubernetes control planes, Lambda runtimes — are patched by AWS. You don't have access to the underlying OS. Suppress these with an appropriate justification and review quarterly to confirm they were actually patched.

> **The rule:** If you cannot merge a code change, run a pipeline, or replace an image to resolve the finding — it's not actionable in your patch cycle. Track it, document your control, and suppress it with a justification and expiry.

---

## 4. SLA tiers

Severity alone is a poor basis for SLAs because it ignores exploitability and actionability. A more useful framework:

| Tier | Criteria | SLA |
|------|----------|-----|
| **P0 — Emergency** | Critical or High + KEV (actively exploited in wild) + reachable | 24 hours |
| **P1 — Urgent** | Critical + EPSS > 0.5, or Critical + reachable internet-facing asset | 7 days |
| **P2 — High** | Critical or High, no active exploitation, actionable fix available | 30 days |
| **P3 — Standard** | Medium, actionable, not exploited | 90 days |
| **P4 — Backlog** | Low, or any non-actionable finding with a documented control | Next major release / suppress with justification |

Use Pleri to generate a ticket-ready list segmented by tier:

```
Categorise our open vulnerability findings into P0–P4 tiers based on exploitability, reachability, and whether a fix is available. Give me a count per tier and list the P0 and P1 findings with the affected resource and recommended fix.
```

---

## 5. Patch cycle workflow

The goal is a repeatable process that keeps vulnerability debt from compounding. Here's a practical weekly rhythm:

**Monday — triage**
- Pleri delivers a ranked list of new and open findings to `#security-triage` (set this up as a Pleri Task)
- Review P0/P1 items, assign owners, create tickets
- Suppress any findings confirmed non-actionable with a justification

**During sprint — fix**
- Language package vulns go into the owning team's sprint as standard tickets
- Container base image updates go into the platform/infra team's build pipeline
- Pleri generates fix PRs for dependency upgrades where possible (see F3 — Fix)

**Monthly — review**
- Pull a trend report: is your open P2/P3 count going up or down?
- Review suppressed findings to confirm the documented controls are still in place
- Check if any P4 findings have moved into KEV since suppression

```bash
# All active exemptions due for review
plerion vulnerabilities exemptions list --profile-id <PROFILE_ID>
```

**Ask Pleri:**
```
Has our open critical vulnerability count increased or decreased over the past 4 weeks? What are the top 3 reasons for any increase?
```

```
Which suppressed vulnerability findings are expiring in the next 14 days?
```

---

## Verify

- [ ] You can explain the difference between exploitability and actionability
- [ ] You've filtered your vulnerability queue to KEV findings only
- [ ] You've identified at least one language package vulnerability with an available fix
- [ ] You know which finding types to suppress in your environment and why
- [ ] Your team has agreed SLA tiers for P0–P3

---

Next: [F1 — See](/02-see)
