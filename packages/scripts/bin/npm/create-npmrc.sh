#!/bin/bash
TARGET_DIR="${1:-.}"  # defaults to current directory if no argument

rm -f "$TARGET_DIR/.npmrc"
if [ -z "${GITHUB_TOKEN}" ]; then
  echo "Error: GITHUB_TOKEN missing" >&2
  exit 1
fi
echo "@dmsconnect:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}">>"$TARGET_DIR/.npmrc"