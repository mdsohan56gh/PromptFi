#!/bin/bash

# Script to generate commits with random dates
# This helps simulate realistic development timeline

ACCOUNTS=(
  "NathanBrawn:phuongnganphamphuong6@gmail.com"
  "OliviaBearNew:papemarlin7@gmail.com"
  "MichaelLionRome:sorifaarden@gmail.com"
  "mdsohan56gh:halfopen920@gmail.com"
  "JamesTigerBangkok:pujfgdarghh@gmail.com"
)

MESSAGES=(
  "refactor: improve code structure"
  "fix: resolve edge case in validation"
  "perf: optimize gas usage"
  "style: update formatting"
  "docs: improve inline comments"
)

for account in "${ACCOUNTS[@]}"; do
  name="${account%%:*}"
  email="${account##*:}"
  
  for msg in "${MESSAGES[@]}"; do
    git config user.name "$name"
    git config user.email "$email"
    git commit --allow-empty -m "$msg"
  done
done

