---
title: Fix
slug: /04-fix
---

# Module 04 — Fix

**Time:** 25 min | **Paths:** Security Engineer, Platform Engineer

Remediate findings two ways: a script-based fix that Pleri runs directly in your cloud, or an auto-fix PR raised to your code repo for human review and approval.

---

## What you'll do

1. Pick a finding to fix
2. Fix it with a Pleri-generated cloud script
3. Fix it via an auto-fix PR to your code repo
4. Confirm the finding closes

---

## 1. Pick a finding

Open **Findings** in the Plerion console and pick any critical or high finding to work through. Use the filters to narrow by service or resource type.

(placeholder screenshot4-1)

From the CLI, list your top failures to choose from:

```bash
plerion findings list --severity CRITICAL,HIGH --status FAILED --sort-by severityLevel --sort-order desc
```

---

## 2. Fix it — script-based cloud fix

For findings where the change can be applied directly (a misconfigured setting, an open port, a missing encryption flag), Pleri can generate and walk you through the exact script to run in your cloud environment.

Open the finding in the console and click **Ask Pleri**, or ask directly via Pleri MCP:

```
This finding on <resource> is critical. Give me the exact script to fix it in AWS.
```

Pleri will:
- Explain the root cause in plain English
- Produce the exact CLI or API call to fix the configuration
- Tell you what to verify afterwards

(placeholder screenshot4-2)

This is the fastest path for cloud-native misconfigurations — no code review required, the change goes straight to the resource.

---

## 3. Fix it — auto-fix PR

For infrastructure defined in code — Terraform, CloudFormation, CDK — Pleri raises a pull request to your connected code repo with the fix already written. No one touches the cloud directly; the change goes through your normal review and merge process.

To trigger an auto-fix PR, open the finding and click **Raise Auto-fix PR**.

Pleri will:
- Identify the IaC file and block responsible for the misconfiguration
- Write the corrected code
- Open a PR in your connected GitHub (or GitLab) repo with a description of the finding and the change

(placeholder screenshot4-3)

Your team reviews and approves the PR as normal. Once merged, the next Plerion scan will pick up the change and close the finding.

This approach keeps your cloud infrastructure in sync with your code — no drift, full audit trail.

---

## 4. Confirm the finding closes

After applying the fix — either directly or via merged PR — Plerion will detect the change on the next scan and move the finding to `PASSED`.

Check it from the CLI:

```bash
plerion findings list --ids <FINDING_ID> --output json
```

Look for `"status": "PASSED"` in the output.

---

## Verify

- [ ] You've used Pleri to generate a script-based fix
- [ ] You've triggered or reviewed an auto-fix PR in your code repo
- [ ] At least one finding has moved to `PASSED`

---

Next: [Module 05 — Prove](/05-prove)
