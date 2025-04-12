#!/bin/sh
rm -f .npmrc
if [ -z "${GITHUB_TOKEN}" ]; then
  echo "Error: GITHUB_TOKEN not set" >&2
  exit 1
fi
echo "@dmsconnect:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}">>.npmrc

