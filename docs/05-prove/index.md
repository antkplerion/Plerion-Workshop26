---
title: Prove
slug: /05-prove
---

# F4 — Prove

**Time:** 20 min | **Paths:** Security Engineer

Plerion maps every detection to the compliance frameworks your organisation cares about, giving you a continuous, evidence-backed view of your posture — not a point-in-time spreadsheet.

---

## What you'll do

1. Explore your compliance posture across frameworks
2. Generate a compliance report
3. Use Pleri to answer compliance questions and track improvement
4. Understand AI and custom frameworks
5. Connect to your GRC tool

---

## 1. Compliance posture

Open **Compliance** in the Plerion console.

![Compliance dashboard](/img/00-setup/screenshot5-1.png)

Every detection Plerion runs is mapped to controls across every framework it supports. This means as your environment changes — new accounts onboarded, findings remediated, new resources created — your compliance posture updates automatically. You don't run a check once before an audit; you have a live view at all times.

The console shows:

- **Posture score** per framework — the percentage of controls currently passing
- **Failing controls** — what's failing and which resources are responsible
- **Trend over time** — whether your posture is improving, stable, or declining

From the CLI, list all available frameworks and your current posture against each:

```bash
plerion compliance-frameworks list
```

---

## 2. Generate a compliance report

When you need to hand something to an auditor or a GRC reviewer, generate a report for the relevant framework.

First, get your integration ID:

```bash
plerion integrations list --output json
```

Then request and download the report:

```bash
plerion compliance-frameworks request-report \
  --integration-id <INTEGRATION_ID> \
  --framework-id CIS-AWSFB-V700

plerion compliance-frameworks download \
  --integration-id <INTEGRATION_ID> \
  --framework-id CIS-AWSFB-V700 \
  --output-file ./cis-report.pdf
```

The report includes control status (pass/fail/not-applicable), the evidence Plerion used to evaluate each control, and remediation guidance for failures.

**Supported frameworks include:**

| Framework | ID |
|-----------|-----|
| CIS AWS Foundations Benchmark | `CIS-AWSFB-V700` |
| PCI DSS 4.0 | `PCI-DSS-V401` |
| SOC 2 | `SOC2` |
| ISO/IEC 27001 | `iso-iec-27001-october-2022` |
| NIST Cybersecurity Framework | `NIST-CSF-V20` |
| HIPAA | `HIPAA` |
| GDPR | `GDPR` |
| APRA CPG 234 | `APRA-CPG-234` |
| ACSC Essential Eight | `ACSC-ESSENTIAL-EIGHT-MATURITY-MODEL` |

Run `plerion compliance-frameworks list` to see the full list available to your tenant.

---

## 3. Use Pleri for compliance

Pleri can answer compliance questions, summarise your posture, and help you build a remediation plan — in plain English, without you needing to navigate the framework yourself.

```
We're preparing for a SOC 2 Type II audit. What are our failing controls and what's the fastest path to passing them?
```

```
Summarise our current HIPAA posture. Which controls are failing and which teams own the affected resources?
```

```
Has our CIS AWS posture improved or declined over the past 30 days?
```

Pleri can also generate a compliance summary report on demand or on a schedule via Tasks — useful for weekly updates to a CISO or board report.

---

## 4. AI and custom frameworks

Plerion isn't limited to traditional compliance frameworks. As AI systems become regulated and audited, the platform includes frameworks specifically built for AI security:

| Framework | ID |
|-----------|-----|
| OWASP Top 10 for LLM Applications | `OWASP-LLM-TOP10-2026` |
| OWASP Top 10 for Agentic Applications | `OWASP-AGENTIC-TOP10-2026` |
| ISO/IEC 42001 (AI Management) | `ISO-IEC-42001-2023` |
| NIST AI Risk Management Framework | `NIST-AI-RMF-V10` |

If your organisation has internal policies or regulatory requirements that don't map to a standard framework, you can create custom frameworks in the console under **Compliance > Custom Frameworks** and map your own controls to Plerion's detections.

```bash
# List only your custom frameworks
plerion compliance-frameworks list --custom true
```

---

## 5. GRC integrations

Plerion is not a GRC tool — it's the technical control layer that feeds your GRC platform with evidence. If your team uses Vanta or Drata, connect them via Pleri Skills (covered in Module 06) and Plerion will push workload vulnerability data directly into your GRC workspace.

This means your GRC tool stays current with real cloud findings rather than relying on manual evidence uploads or point-in-time assessments. Auditors see live data; your team doesn't do double entry.

---

## Verify

- [ ] You've reviewed your posture against at least one framework in the console
- [ ] You've generated and downloaded a compliance report
- [ ] Pleri has answered a compliance question about your environment
- [ ] You know where to add a custom framework if needed

---

Next: [F5 — Vulnerability Management](/f5-vuln-mgmt)
