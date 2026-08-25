---
title: See
slug: /01-see
---

# Module 01 — See

**Time:** 20 min | **Paths:** Security Engineer, Platform Engineer

Explore your cloud asset inventory and understand what Plerion has discovered about your environment.

---

## What you'll do

1. Browse the asset inventory
2. Filter assets by service, region, and tag
3. View a resource's full configuration and relationships
4. Ask Pleri to summarise what it sees

---

## 1. Browse the asset inventory

In the Plerion console, open **Inventory**. You'll see every resource across your connected accounts — EC2 instances, S3 buckets, IAM roles, RDS clusters, Lambda functions, and more.

Use the CLI:

```bash
plerion inventory list --service s3
plerion inventory list --service ec2 --region ap-southeast-2
```

---

## 2. Filter and search

Narrow the view by tag, VPC, or configuration property:

```bash
plerion inventory list --tag Environment=production
plerion inventory search --query "publicly accessible RDS"
```

---

## 3. Inspect a resource

```bash
plerion inventory get --arn arn:aws:s3:::bad-cloud-public-bucket
```

This returns the full resource configuration, attached policies, relationships, and any active findings.

### Two Ways — Console or Pleri

**Console:** Navigate to Inventory, click a resource, open the **Relationships** tab.

**Pleri:** Ask Pleri directly:

```
Who can reach the bad-cloud-public-bucket S3 bucket, and what findings are attached to it?
```

---

## 4. Understand relationships

Plerion builds a graph of your cloud. From any resource you can see:

- What IAM principals have access
- What network paths lead to it
- Which findings are active against it

---

## Verify

- [ ] You can see Bad Cloud resources in the Inventory view
- [ ] You can filter by service and region
- [ ] You've opened a resource and seen its relationships
- [ ] You've asked Pleri at least one inventory question

---

Next: [Module 02 — Prioritize](/02-prioritize)
