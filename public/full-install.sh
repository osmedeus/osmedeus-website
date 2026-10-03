#!/usr/bin/env bash
set -euo pipefail

# Osmedeus CLI Full Installation Script
# The regular installer (install.sh), then `osmedeus health` to validate the
# setup and write a sample config. A wrapper rather than a copy, so a fix to
# the installer lands here too.

INSTALLER_URL="https://www.osmedeus.org/install.sh"

if command -v curl >/dev/null 2>&1; then
	fetch=(curl -fsSL)
else
	fetch=(wget -qO-)
fi

"${fetch[@]}" "$INSTALLER_URL" | OSM_HEALTH_CHECK=1 bash
