---
title: Setup
slug: /00-setup
---

# Module 00 — Setup

**Time:** 15 min | **Paths:** Security Engineer, Platform Engineer

Get your environment ready and connect your first AWS account to Plerion.

---

## What you'll do

1. Install the Plerion CLI and Pleri CLI
2. Deploy the Bad Cloud Terraform environment
3. Onboard your AWS account to Plerion
4. Confirm the first scan has run

---

## 1. Install the Plerion CLI

Download the pre-built binary for your platform from the [Plerion CLI releases page](https://github.com/plerionhq/plerion-cli/releases), then configure your credentials:

```bash
plerion configure
```

This creates `~/.plerion/credentials` and `~/.plerion/config`. You'll need an API key from **Settings > API Keys** in the Plerion console.

Verify the install:

```bash
plerion tenant get
```

---

## 2. Deploy Bad Cloud

Clone the Bad Cloud repository and apply the Terraform:

```bash
git clone https://github.com/plerionhq/bad-cloud.git
cd bad-cloud
terraform init
terraform apply -auto-approve
```

This creates a set of intentionally misconfigured resources across EC2, S3, RDS, IAM, and networking.

---

## 3. Connect your AWS account

Log in to your Plerion tenant and navigate to **Settings > Accounts > Add Account**.

Follow the CloudFormation onboarding wizard, or use the CLI:

```bash
plerion accounts add --provider aws --account-id <YOUR_ACCOUNT_ID>
```

Plerion deploys a cross-account read role and registers the account for scanning.

---

## 4. Confirm first scan

```bash
plerion scans list --account-id <YOUR_ACCOUNT_ID>
```

The first CSPM scan typically completes within 5–10 minutes. Once the status is `COMPLETED`, move to Module 01.

---

## Verify

- [ ] `plerion tenant get` returns your tenant details
- [ ] Bad Cloud resources appear in the AWS console
- [ ] Your account shows `Connected` in Plerion Settings
- [ ] At least one scan is `COMPLETED`

---

Next: [Module 01 — See](/01-see)
