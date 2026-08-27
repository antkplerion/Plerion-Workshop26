---
title: Setup
slug: /00-setup
---

# Module 00 — Setup

**Time:** 15-30 min | **Paths:** Security Engineer, Platform Engineer

(Solo) Review workshop and follow along with your own Plerion Tenant.
(Guided with Plerion) Using the Plerion Demo account, be guided in all set up.

---

## What you'll do

1. Sign up and invite teammates
2. Install the Plerion CLI 
3. Onboard your Cloud Environment(s) to Plerion's Agentless Scanning
4. Onboard your Code Repo to Plerion Code Security
5. Confirm the first findings

---

## 1. Sign Up and Invite teammates

Go to the Plerion Website's sign-up page and enter your Work Email [Sign up page](https://www.plerion.com/sign-up)

![Sign-up page](/img/00-setup/screenshot1.png)

This will trigger a confirmation email and you will then set up your username, password and MFA. 

Next, click on "Go to Integrations" and in the top right click on "Admin". Here you'll be able to add users as `Org-Admin`/`Tenant-Admin` or `Org-ReadOnly`/`Tenant-ReadOnly`. 

For general users with full access to Plerion, we recommend `Org-Admin`.

---

## 2. Install the Plerion CLI

Download the pre-built binary for your platform from the [Plerion CLI releases page](https://github.com/plerionhq/plerion-cli/releases), then configure your credentials:

```bash
plerion configure
```

This creates `~/.plerion/credentials` and `~/.plerion/config`. You'll need an API key from **Settings > API Keys** in the Plerion console.

![API Keys settings](/img/00-setup/screenshot2.png)

Verify the install:

```bash
plerion tenant get
```

---

## 3. Onboard your Cloud Environment (AWS)

Log in to your Plerion tenant and navigate to **Settings > Accounts > Add Account**.

Follow the onboarding steps through the UI:
![Add Account step 1](/img/00-setup/screenshot3.png)

![Add Account step 2](/img/00-setup/screenshot4.png)

![Add Account step 3](/img/00-setup/screenshot5.png)

Plerion deploys a cross-account read-only role for agentless scanning and registers the account with the Plerion Service Account. 

---

## 4. Onboard your Code Repo to Plerion Code Security

Go to Settings > Integrations > Scroll to your code repo (e.g. Github) 

Click on the "+" sign on github, follow the OAuth flow to adding the integration. You may specify repos and specify permissibility with read-only or write as well. Pleri will use write-based permissions to make comments on new PRs (this can be toggled on/off) as well as raise auto-fix PRs for human review and approval to patch vulnerabilities. 

![GitHub integration](/img/00-setup/screenshot6.png)

---

## 5. Confirm first findings

Confirm the CSPM findings are coming through on the platform. Running this script in your terminal should give you 3 failed findings. 

```bash
plerion findings list --severity CRITICAL,HIGH --status FAILED --output json --query "sort_by([].{id: id, title: message, severity: severityLevel}, &severity)[:3]"  
```

NOTE: The first CSPM scan typically completes within 5–10 minutes. Once you've run the script successfully, move to Module 01.

---

## Verify

- [ ] `plerion findings list` returns your tenant cspm findings
- [ ] AWS integration appears in the Plerion Console
- [ ] At least one scan is `COMPLETED`

---

Next: [Module 01 — Connect Pleri](/01-connect-pleri)
