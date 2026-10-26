#!/usr/bin/env bash
# Pulls the latest built site from S3 into the web folder on the Lightsail server.
# Runs from cron (see scripts/README-lightsail.md). Safe to run by hand too.
set -euo pipefail

BUCKET="${BUCKET:-neuhaus-website}"
WEB_ROOT="${WEB_ROOT:-/var/www/neufoot}"
REGION="${AWS_REGION:-us-east-1}"
STAGING="${STAGING:-/var/www/neufoot-staging}"
LOG="${LOG:-/var/log/neufoot-sync.log}"

exec 9>/tmp/neufoot-sync.lock
flock -n 9 || { echo "$(date -Is) another sync is running, skipping" >> "$LOG"; exit 0; }

mkdir -p "$STAGING" "$WEB_ROOT"

# 1. Download to a staging folder first, so visitors never see a half-copied site.
if ! aws s3 sync "s3://${BUCKET}/" "$STAGING/" --delete --region "$REGION" --only-show-errors >> "$LOG" 2>&1; then
  echo "$(date -Is) S3 download failed, site left unchanged" >> "$LOG"
  exit 1
fi

# 2. Safety check: never publish an empty or broken download.
if [ ! -s "$STAGING/index.html" ]; then
  echo "$(date -Is) staging has no index.html, site left unchanged" >> "$LOG"
  exit 1
fi

# 3. Copy into the live folder. Only changed files are touched.
rsync -a --delete "$STAGING/" "$WEB_ROOT/"
echo "$(date -Is) synced OK" >> "$LOG"
