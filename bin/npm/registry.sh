#!/bin/bash
rm -f .npmrc
if [ -z "${GITHUB_TOKEN}" ]; then
  echo "Error: GITHUB_TOKEN missing" >&2
  exit 1
fi
echo -e "@dmsconnect:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}">>.npmrc