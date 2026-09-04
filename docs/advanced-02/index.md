---
title: Embed Code Security in CI/CD
slug: /advanced-02
---

# A2 — Embed Code Security in CI/CD

**Time:** 45 min | **Paths:** Advanced, Security Engineer, Platform Engineer

Plerion scans repositories and pull requests automatically. This module adds a third layer: scanning IaC at build time, before a container image is pushed to ECR. Combined with runtime workload scanning, you get coverage at every phase.

| Phase | Coverage |
|---|---|
| Pull request | Automatic scanning via the GitHub or GitLab integration |
| **Build** | This module — scan IaC and Dockerfiles before pushing to ECR |
| Runtime | CWPP scans running containers pulled from ECR |

---

## What you'll do

1. Package your IaC files and upload them to Plerion for scanning
2. Poll for results and check for CRITICAL or HIGH findings
3. Gate the build (or log and continue) based on what's found
4. Plug the script into your CI tool

---

## Prerequisites

- A Plerion API key with code security access — generate one under **Settings > API Keys**
- `PLERION_API_KEY` stored as a secret in your CI environment
- `plerion` CLI installed in your build agent, or `curl` and `jq` for the raw API approach
- Max zip size: **4.4 MB**. If your IaC directory is larger, zip subdirectories individually

---

## 1. The scan script

Save this as `plerion-scan.sh` at the root of your repo. It works in any CI environment.

```bash
#!/usr/bin/env bash
set -euo pipefail

ARTIFACT_NAME="${ARTIFACT_NAME:-iac-scan-$(date +%s)}"
BLOCK_ON_FINDINGS="${BLOCK_ON_FINDINGS:-false}"
MAX_WAIT="${MAX_WAIT:-300}"

echo "Packaging IaC files..."
zip -r iac-scan.zip . \
  -x ".git/*" -x "node_modules/*" -x ".terraform/*" \
  -x "*.zip" -x "*.tar.gz" -x "*.tar" -x "*.png" -x "*.jpg"

echo "Uploading to Plerion..."
SCAN_ID=$(plerion iac scan \
  --file iac-scan.zip \
  --name "$ARTIFACT_NAME" \
  --output json \
  --query 'meta.scanId' | tr -d '"')

echo "Scan ID: $SCAN_ID"

echo "Waiting for scan to complete..."
ELAPSED=0
STATUS=""
until [[ "$STATUS" == "SUCCESS" || "$STATUS" == "FAILURE" ]]; do
  sleep 10
  ELAPSED=$((ELAPSED + 10))
  STATUS=$(plerion iac list-scans \
    --ids "$SCAN_ID" \
    --output json \
    --query 'data[0].status' | tr -d '"')
  echo "  Status: $STATUS (${ELAPSED}s elapsed)"
  if [[ $ELAPSED -ge $MAX_WAIT ]]; then
    echo "Timed out after ${MAX_WAIT}s"
    exit 1
  fi
done

echo "Checking for critical/high findings..."
COUNT=$(plerion iac get-findings \
  --scan-id "$SCAN_ID" \
  --severity CRITICAL,HIGH \
  --status FAILED \
  --output json \
  --query 'length(data)')

echo "Critical/High findings: $COUNT"

if [[ "$COUNT" -gt 0 ]]; then
  plerion iac get-findings \
    --scan-id "$SCAN_ID" \
    --severity CRITICAL,HIGH \
    --status FAILED
  if [[ "$BLOCK_ON_FINDINGS" == "true" ]]; then
    echo "Build blocked: $COUNT critical/high finding(s) detected"
    rm -f iac-scan.zip
    exit 1
  else
    echo "Warning: findings detected. Set BLOCK_ON_FINDINGS=true to gate the build."
  fi
else
  echo "No critical/high findings. Scan passed."
fi

rm -f iac-scan.zip
```

Set `BLOCK_ON_FINDINGS=true` to fail the build on findings. Leave it unset to log and continue — useful when rolling this out without disrupting existing pipelines.

---

## 2. CI integration

The script reads from environment variables, so it drops into any CI tool as a shell step. Set `PLERION_API_KEY` as a protected secret and `BLOCK_ON_FINDINGS` as a variable.

**GitHub Actions**

```yaml
- name: Plerion IaC scan
  env:
    PLERION_API_KEY: ${{ secrets.PLERION_API_KEY }}
    ARTIFACT_NAME: ${{ github.repository }}-${{ github.run_number }}
    BLOCK_ON_FINDINGS: "true"
  run: bash plerion-scan.sh
```

**GitLab CI**

```yaml
plerion-scan:
  stage: test
  script:
    - bash plerion-scan.sh
  variables:
    ARTIFACT_NAME: "$CI_PROJECT_NAME-$CI_PIPELINE_ID"
    BLOCK_ON_FINDINGS: "true"
```

**TeamCity / Buildkite / Jenkins**

Add a shell step before your image push step. Inject `PLERION_API_KEY` via your secrets manager and call `bash plerion-scan.sh`. The exit code gates the build naturally.

Place the step **after** your build context is assembled but **before** `docker push` or `ecr push`.

---

## 3. Using the raw API

If you cannot install the CLI in your build environment, use `curl` and `jq` directly.

```bash
#!/usr/bin/env bash
set -euo pipefail

REGION="${PLERION_REGION:-au}"
ARTIFACT_NAME="${ARTIFACT_NAME:-iac-scan-$(date +%s)}"
BLOCK_ON_FINDINGS="${BLOCK_ON_FINDINGS:-false}"

zip -r iac-scan.zip . \
  -x ".git/*" -x "node_modules/*" -x ".terraform/*" \
  -x "*.zip" -x "*.tar.gz"

RESPONSE=$(curl -sf -X POST \
  "https://${REGION}.api.plerion.com/v1/tenant/shiftleft/iac/scan?artifactName=${ARTIFACT_NAME}" \
  -H "Authorization: Bearer $PLERION_API_KEY" \
  -H "Content-Type: application/zip" \
  --data-binary @iac-scan.zip)

SCAN_ID=$(echo "$RESPONSE" | jq -r '.meta.scanId')
echo "Scan ID: $SCAN_ID"

# Poll until findings are available (any result means scan is complete)
ATTEMPTS=0
until [[ $ATTEMPTS -ge 30 ]]; do
  sleep 10
  ATTEMPTS=$((ATTEMPTS + 1))
  DATA=$(curl -sf \
    "https://${REGION}.api.plerion.com/v1/tenant/shiftleft/iac/scans/${SCAN_ID}/findings?perPage=1" \
    -H "Authorization: Bearer $PLERION_API_KEY")
  HAS_DATA=$(echo "$DATA" | jq -r 'if (.data | length) > 0 then "yes" else "no" end')
  [[ "$HAS_DATA" == "yes" ]] && break
done

# Query for critical/high failures
RESULT=$(curl -sf \
  "https://${REGION}.api.plerion.com/v1/tenant/shiftleft/iac/scans/${SCAN_ID}/findings?results=FAILED&severityLevels=CRITICAL,HIGH&perPage=1000" \
  -H "Authorization: Bearer $PLERION_API_KEY")

TOTAL=$(echo "$RESULT" | jq -r '.meta.total')
echo "Critical/High findings: $TOTAL"

if [[ "$TOTAL" -gt 0 ]]; then
  echo "$RESULT" | jq '.data[] | {file, detectionTitle, severityLevel}'
  if [[ "$BLOCK_ON_FINDINGS" == "true" ]]; then
    echo "Build blocked: $TOTAL critical/high finding(s) detected"
    rm -f iac-scan.zip
    exit 1
  fi
fi

rm -f iac-scan.zip
```

The upload returns 202 immediately. The scan runs asynchronously. Poll the findings endpoint until `data` is non-empty before checking for failures.

**Supported IaC types:** Terraform, CloudFormation, Bicep, ARM templates, Kubernetes manifests, Helm charts, Dockerfiles.

**Region values:** `au` (default), `sg1`, `in1`, `us1` — match the region your Plerion tenant is in.

---

## Verify

- [ ] `bash plerion-scan.sh` runs locally against your repo without error
- [ ] The scan appears in the Plerion console under **Code Security**
- [ ] You've set `BLOCK_ON_FINDINGS=true` and confirmed a critical finding fails the build step
- [ ] You've confirmed that with `BLOCK_ON_FINDINGS=false`, findings are logged but the build continues
- [ ] The scan step runs before your `docker push` step in CI

---

Next: [F1 — See](/02-see)
