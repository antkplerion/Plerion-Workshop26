---
title: See
slug: /02-see
---

# Module 02 — See

**Time:** 20 min | **Paths:** Security Engineer, Platform Engineer

Explore your cloud asset inventory and understand what Plerion has discovered about your environment.

---

## What you'll do

1. Browse the asset inventory
2. Filter assets by service, region, and exposure
3. Inspect a resource's configuration and relationships
4. Ask Pleri to summarise what it sees

---

## 1. Browse the asset inventory

In the Plerion console, open **Assets**. You'll see every resource across your connected accounts — EC2 instances, S3 buckets, IAM roles, RDS clusters, Lambda functions, and more.

(placeholder screenshot2-1)

Use the CLI to list assets by service or region:

```bash
plerion assets list --service s3
plerion assets list --service ec2 --region ap-southeast-2
```

---

## 2. Filter assets

Narrow the view by exposure, vulnerability status, or severity:

```bash
# Publicly exposed assets
plerion assets list --is-publicly-exposed

# Assets with active critical findings
plerion assets list --severity CRITICAL

# Vulnerable assets with a known exploit
plerion assets list --is-vulnerable --has-exploit
```

In the console, use the filter bar to combine conditions — service, region, exposure, and more.

(placeholder screenshot2-2)

---

## 3. Inspect a resource

Click any asset in the console to open its detail view. This shows:

- Full resource configuration
- Active findings
- IAM principals with access
- Network relationships

To fetch a specific asset from the CLI, copy its asset ID from the console (format: `prn:assets:...`) and run:

```bash
plerion assets get --asset-id <ASSET_ID>
```

---

## 4. Ask Pleri

The console gives you data. Pleri gives you answers.

```
Which S3 buckets in my account are publicly accessible and have active findings?
```

```
Show me all EC2 instances in production that are internet-facing.
```

```
What IAM roles have access to my most critical assets?
```

Pleri queries the asset graph and returns results in plain English, with links back to the console.

---

## Verify

- [ ] You can see your assets in the Plerion console
- [ ] You've filtered by service and region from the CLI
- [ ] You've opened a resource and seen its relationships
- [ ] You've asked Pleri at least one asset question

---

Next: [Module 03 — Prioritize](/03-prioritize)
