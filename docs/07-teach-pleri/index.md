---
title: Teach Pleri
slug: /07-teach-pleri
---

# Module 07 — Teach Pleri

**Time:** 20 min | **Paths:** Platform Engineer

Add custom findings, policies, and organisational context so Pleri gives answers that are specific to your environment — not generic cloud security advice.

---

## What you'll do

1. Write a custom finding policy
2. Add organisational context (teams, services, owners)
3. Test that Pleri uses the context in its answers
4. Create a custom compliance control

---

## 1. Write a custom finding policy

Custom policies are written in Rego (OPA) or using Plerion's policy DSL.

```yaml
# policies/require-backup-tag.yaml
name: EC2 instances must have a Backup tag
severity: medium
resource: aws_ec2_instance
condition:
  not:
    tag_exists: Backup
remediation: |
  Add the tag `Backup=true` or `Backup=false` to every EC2 instance.
  Resources with `Backup=false` should have a documented exception.
```

```bash
plerion policies create --file policies/require-backup-tag.yaml
plerion policies run --name "EC2 instances must have a Backup tag"
```

---

## 2. Add organisational context

Tell Pleri who owns what:

```bash
plerion context add \
  --resource-tag "Team=payments" \
  --owner "payments-team@company.com" \
  --slack-channel "#payments-security"
```

Or upload a CSV:

```bash
plerion context import --file team-ownership.csv
```

Once context is set, Pleri can say "this finding is owned by the payments team" rather than just listing the resource ARN.

---

## 3. Test contextual answers

Without context:
```
Which EC2 instances have critical findings?
```
> Returns a list of ARNs.

With context:
```
Which EC2 instances have critical findings?
```
> Returns the same list, but now includes the owning team, Slack channel, and on-call contact for each instance.

---

## 4. Create a custom compliance control

```yaml
# controls/data-residency-ap.yaml
name: All storage must be in ap-southeast-2
framework: internal-data-residency
control_id: DR-01
resource_types:
  - aws_s3_bucket
  - aws_rds_cluster
  - aws_dynamodb_table
condition:
  region: ap-southeast-2
```

```bash
plerion controls create --file controls/data-residency-ap.yaml
plerion compliance check --framework internal-data-residency
```

---

## Verify

- [ ] Custom policy runs and produces findings
- [ ] At least one resource has an owner assigned
- [ ] Pleri references team ownership in its answers
- [ ] A custom compliance control is passing or failing as expected

---

Next: [Module 08 — Operate](/08-operate)
