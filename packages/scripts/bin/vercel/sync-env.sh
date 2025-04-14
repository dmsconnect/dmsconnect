#!/bin/bash

TARGET_DIR="${1:-.}"
set -e

cd $TARGET_DIR

# Ensure VERCEL_TOKEN is set
if [[ -z "$VERCEL_TOKEN" ]]; then
  echo "❌ VERCEL_TOKEN is not set."
  exit 1
fi

if [[ -z "$DOPPLER_TOKEN" ]]; then
  echo "❌ DOPPLER_TOKEN is not set."
  exit 1
fi

echo "🔗 Linking Vercel Project"
vercel link --yes --token="$VERCEL_TOKEN"

echo "🔍 Fetching Vercel production environment variables..."

echo "🔍 Listing Vercel environment variables for production..."
vercel env ls production --token="$VERCEL_TOKEN" > tmp_vercel_envs.txt

echo "🧼 Extracting variable names..."
# Extract variable names (skip header and separator lines)
vars=$(awk 'NR>2 {print $1}' tmp_vercel_envs.txt)

if [[ -z "$vars" ]]; then
  echo "✅ No environment variables to remove."
fi

for var in $vars; do
  echo "❌ Removing $var from production environment..."
  vercel env rm "$var" production --yes --token="$VERCEL_TOKEN"
done

# rm tmp_vercel_envs.txt
echo "✅ All production environment variables removed successfully."

doppler secrets download --no-file --format env > .env

set -euo pipefail

ENV_FILE=".env"

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set. Aborting."
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ $ENV_FILE not found."
  exit 1
fi

echo "🚀 Syncing .env variables to Vercel production environment..."

while IFS='=' read -r key raw_value || [[ -n "$key" ]]; do
  # Skip blank lines or lines starting with #
  [[ -z "$key" || "$key" =~ ^# ]] && continue

  # Handle multiline values safely (read does not trim \n automatically)
  value=$(echo "$raw_value" | sed -e 's/^["'\'']//' -e 's/["'\'']$//')

  echo "🔑 Syncing $key"
  vercel env add "$key" production --token="$VERCEL_TOKEN" <<< "$value"

done < "$ENV_FILE"

echo "✅ Done syncing all variables from .env to Vercel (production)."

