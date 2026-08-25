---
title: Prove
slug: /04-prove
---

# Module 04 — Prove

**Time:** 20 min | **Paths:** Security Engineer

Generate compliance reports, map findings to control frameworks, and produce audit-ready evidence.

---

## What you'll do

1. Run a compliance check against CIS AWS Foundations
2. Export a report for an auditor
3. Map a finding to a specific control
4. Use Pleri to answer an auditor question

---

## 1. Run a compliance check

```bash
plerion compliance check --framework cis-aws-1.5
```

This runs all CIS AWS 1.5 controls against your connected accounts and returns pass/fail per control.

In the console: open **Compliance**, select **CIS AWS Foundations Benchmark 1.5**, and click **Run Check**.

---

## 2. Export a report

```bash
plerion compliance export \
  --framework cis-aws-1.5 \
  --format pdf \
  --output ./cis-report.pdf
```

The exported report includes:
- Control status (pass/fail/not-applicable)
- Evidence per control
- Remediation guidance for failures

---

## 3. Supported frameworks

| Framework | ID |
|-----------|-----|
| CIS AWS Foundations 1.5 | `cis-aws-1.5` |
| PCI-DSS 4.0 | `pci-dss-4.0` |
| SOC 2 Type II | `soc2` |
| ISO 27001:2022 | `iso-27001-2022` |
| NIST CSF | `nist-csf` |
| HIPAA | `hipaa` |

---

## 4. Map a finding to a control

```bash
plerion findings get --id <FINDING_ID> --show-controls
```

Each finding is tagged with the controls it satisfies or violates across all frameworks.

---

## 5. Ask Pleri

### Two Ways

**Console:** Open **Compliance**, click a failing control, click **Ask Pleri**.

**Pleri:**
```
We're preparing for a SOC 2 Type II audit. What are our failing controls and what's the fastest path to passing them?
```

---

## Verify

- [ ] CIS AWS 1.5 check has run against your account
- [ ] You have a PDF report you could hand to an auditor
- [ ] You can trace a finding back to a specific control
- [ ] Pleri has answered a compliance question

---

Next: [Module 05 — Connect Pleri](/05-connect-pleri)
