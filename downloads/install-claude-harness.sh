#!/usr/bin/env bash
# TotalControl Core Harness Free 1.5.1-beta — Linux installer
set -e
DIR="${1:-$HOME/TotalControl-Core-Harness-Free}"
URL="https://oroboroslabs-ai.github.io/anthropic/downloads/totalcontrol-core-harness-free-1.5.1-beta.tar.gz"
echo "installing to $DIR"
mkdir -p "$DIR"
curl -L "$URL" -o /tmp/tc-harness.tar.gz
tar -xzf /tmp/tc-harness.tar.gz -C "$DIR" --strip-components=1
chmod +x "$DIR/totalcontrol-core-harness-free" 2>/dev/null || true
echo "done — run: $DIR/totalcontrol-core-harness-free --no-sandbox"