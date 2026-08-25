---
title: Fix
slug: /04-fix
---

# Module 04 — Fix

**Time:** 25 min | **Paths:** Security Engineer, Platform Engineer

Remediate findings three ways: through the Plerion console, via Pleri AI, and by patching the Bad Cloud Terraform.

---

## What you'll do

1. Fix a finding from the console
2. Let Pleri generate a remediation and create a ticket
3. Apply a Terraform fix to Bad Cloud and verify the finding closes

---

## 1. Fix from the console

Open **Findings**, select the `S3 bucket publicly accessible` finding on `bad-cloud-public-bucket`.

Click **Remediate** and follow the guided steps. Plerion shows you exactly which setting to change.

```bash
plerion findings get --id <FINDING_ID>
plerion findings remediate --id <FINDING_ID>
```

---

## 2. Pleri-assisted remediation

### Two Ways

**Console:** Open the finding, click **Ask Pleri**, and request a fix.

**Pleri:**
```
The finding F-<ID> on bad-cloud-public-bucket is critical. Give me the exact Terraform change to fix it and create a Jira ticket for our team.
```

Pleri will:
- Explain the root cause
- Produce the Terraform diff
- Open a Jira ticket with the fix attached

---

## 3. Fix in Terraform

Apply the fix to Bad Cloud:

```hcl
# bad-cloud/s3.tf
resource "aws_s3_bucket_public_access_block" "bad_cloud" {
  bucket = aws_s3_bucket.bad_cloud_public.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

```bash
terraform apply -auto-approve
```

---

## 4. Verify the finding closes

After the next scan (or trigger one manually):

```bash
plerion scans trigger --account-id <YOUR_ACCOUNT_ID>
plerion findings get --id <FINDING_ID>
```

The status should move to `RESOLVED`.

---

## Verify

- [ ] At least one finding is now `RESOLVED`
- [ ] You've used Pleri to generate a remediation
- [ ] The Terraform change is applied and confirmed
- [ ] A Jira ticket (or similar) exists for the fix

---

Next: [Module 05 — Prove](/05-prove)
