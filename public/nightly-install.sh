#!/usr/bin/env bash
set -euo pipefail

# Osmedeus CLI Nightly Installation Script
# The regular installer (install.sh), pinned to the nightly build. Nightlies
# are published to GitHub releases only, not npm. A wrapper rather than a
# copy, so a fix to the installer lands here too.

INSTALLER_URL="https://www.osmedeus.org/install.sh"

if command -v curl >/dev/null 2>&1; then
	fetch=(curl -fsSL)
else
	fetch=(wget -qO-)
fi

"${fetch[@]}" "$INSTALLER_URL" | OSM_VERSION="v0.0.0-nightly" OSM_SOURCE=github bash
