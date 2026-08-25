<img src="https://docs.plerion.com/logo/plerion.svg" alt="Plerion" width="80" />

# Plerion Workshop 2026

A hands-on workshop site for learning Plerion — covering cloud security posture management, workload protection, vulnerability management, and more.

## Purpose

This repository is the source for a self-paced workshop designed to help users get up to speed with Plerion across all its core capability areas. Each module walks through a feature set end-to-end: what it does, how to configure it, and how to act on what it surfaces.

The workshop is aimed at:
- Security engineers onboarding to Plerion for the first time
- Cloud engineers wanting to understand what Plerion sees in their environment
- Teams rolling out Plerion org-wide and needing a repeatable enablement resource

## Workshop Modules (Planned)

### 1. Getting Started
- Connecting your first AWS account
- Understanding the Plerion console
- Navigating tenants, integrations, and organizations

### 2. Cloud Security Posture Management (CSPM)
- How CSPM collection works
- Reading and triaging findings
- Compliance frameworks and controls
- Custom checks

### 3. Cloud Workload Protection (CWPP)
- Enabling workload scanning
- How the scanner works (appliances, snapshots, scan jobs)
- Vulnerability findings and prioritization
- Service account vs same-account scanning modes

### 4. Vulnerability Management
- Understanding CVEs surfaced by Plerion
- Exploitability and risk scoring
- Exemptions and suppression
- Integrating with ticketing systems (Jira, Linear, etc.)

### 5. Identity & Access (CIEM)
- Reviewing over-permissive identities
- External access findings
- Access reviews and decisions

### 6. Detections & Alerts
- Setting up alert rules
- Notification channels
- Understanding detection types

### 7. Reporting & Custom Reports
- Built-in dashboards
- Building custom reports
- Exporting data

### 8. Integrations & Automation
- Connecting third-party tools
- Webhooks and outbound integrations
- Using the Plerion API and CLI

## Structure

```
/
├── README.md          # This file
├── docs/              # Workshop content and guides (one folder per module)
├── src/               # Website source code
├── public/            # Static assets
└── exercises/         # Hands-on exercises and lab files per module
```

## Contributing

This is an internal workshop resource. If you spot something wrong or want to add a module, open a PR against `main`.

## Status

Active development — modules will be added progressively.
