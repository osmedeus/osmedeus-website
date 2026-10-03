#!/usr/bin/env bash
set -euo pipefail

# Osmedeus CLI Installation Script
# Installs the pre-compiled Osmedeus CLI binary: from the per-platform
# @j3ssie/osmedeus package on the npm registry's CDN first (no node or npm
# needed), and from GitHub releases if that fails.
#
# The one installer. nightly-install.sh and full-install.sh are thin wrappers
# that pipe this file through bash with some of these set:
#   OSM_VERSION=v1.2.3       install that release instead of the latest
#   OSM_SOURCE=github        skip npm and install from GitHub releases
#   OSM_HEALTH_CHECK=1       run `osmedeus health` once installed
#   OSM_URL=https://...      fetch metadata.json and tarballs from a mirror
#   OSM_NPM_REGISTRY=https://...  use an npm registry mirror

# Configuration
OSM_HOME="${OSM_HOME:-$HOME/.osmedeus}"
BIN_DIR="$HOME/.local/bin"
GITHUB_REPO="j3ssie/osmedeus"
FALLBACK_VERSION="v5.0.0-beta"
NPM_REGISTRY="${OSM_NPM_REGISTRY:-https://registry.npmjs.org}"
NPM_PKG="@j3ssie/osmedeus"
NPM_PKG_ENC="@j3ssie%2fosmedeus"  # URL-encoded scoped name

# Retry configuration
MAX_RETRIES=6
INITIAL_RETRY_DELAY=2  # seconds

OSM_URL_ENV_SET=0
if [[ -n "${OSM_URL+x}" ]]; then
	OSM_URL_ENV_SET=1
fi
OSM_URL="${OSM_URL:-}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Cleanup on interrupt
cleanup() {
	echo -e "\n${YELLOW}Installation interrupted...${NC}"
	rm -f "$OSM_HOME/osm-install-"* 2>/dev/null || true
	exit 1
}

trap cleanup INT TERM

log() {
	echo -e "${BLUE}[INFO]${NC} $1" >&2
}

warn() {
	echo -e "${YELLOW}[WARN]${NC} $1" >&2
}

error() {
	echo -e "${RED}[ERROR]${NC} $1" >&2
	exit 1
}

success() {
	echo -e "${GREEN}[SUCCESS]${NC} $1" >&2
}

# Check if command exists
command_exists() {
	command -v "$1" >/dev/null 2>&1
}

# Require command to exist or exit with error
need_cmd() {
	if ! command_exists "$1"; then
		error "need '$1' (command not found)"
	fi
}

# Check optional workflow dependencies and warn if missing
check_workflow_deps() {
	local missing=()
	for cmd in jq make gcc git; do
		if ! command_exists "$cmd"; then
			missing+=("$cmd")
		fi
	done

	if [[ ${#missing[@]} -gt 0 ]]; then
		warn "Heads up: ${LIGHT_GREEN}${missing[*]}${NC} not found — some workflow installations might be broken without it."
		warn "Install them with: ${LIGHT_GREEN}sudo apt-get update && sudo apt-get install -y jq build-essential git${NC}"
	fi
}

# Check all prerequisite commands upfront
check_prereqs() {
	for cmd in uname mktemp chmod mkdir rm mv tar grep awk cut head sed basename touch gzip; do
		need_cmd "$cmd"
	done

	# Check for sha256 checksum command (shasum on macOS/BSD, sha256sum on Linux)
	if command_exists shasum; then
		SHA256_CMD="shasum -a 256"
		SHA1_CMD="shasum -a 1"
	elif command_exists sha256sum; then
		SHA256_CMD="sha256sum"
		SHA1_CMD="sha1sum"
	else
		error "need 'shasum' or 'sha256sum' (command not found)"
	fi

	# Optional: parses the registry's JSON exactly; grep/sed does without it.
	JQ="$(command -v jq || true)"
}

# Detect target platform for CLI binary
detect_platform() {
	local platform
	platform="$(uname -s) $(uname -m)"

	case $platform in
		'Darwin x86_64')
			target=darwin_amd64
			;;
		'Darwin arm64')
			target=darwin_arm64
			;;
		'Linux aarch64' | 'Linux arm64')
			target=linux_arm64
			;;
		'Linux riscv64')
			error 'Not supported on riscv64'
			;;
		'Linux x86_64' | *)
			target=linux_amd64
			;;
	esac

	# Check for Rosetta 2 on macOS
	if [[ "$target" == "darwin_amd64" ]]; then
		if [[ $(sysctl -n sysctl.proc_translated 2>/dev/null) = 1 ]]; then
			target=darwin_arm64
			log "Your shell is running in Rosetta 2. Using $target instead"
		fi
	fi

	echo "$target"
}

# Robust downloader that handles snap curl issues with retry logic.
#   $1 = url, $2 = output file, $3 = 1 to draw a progress bar on stderr
# Returns non-zero once retries run out, so a caller can fall back.
downloader() {
	local url="$1"
	local output_file="$2"
	local progress="${3:-0}"
	local attempt=1
	local delay=$INITIAL_RETRY_DELAY

	# Check if we have a broken snap curl
	local snap_curl=0
	if command_exists curl; then
		local curl_path
		curl_path=$(command -v curl)
		if [[ "$curl_path" == *"/snap/"* ]]; then
			snap_curl=1
		fi
	fi

	while [[ $attempt -le $MAX_RETRIES ]]; do
		# Remove any partial download from previous attempt
		rm -f "$output_file" 2>/dev/null || true

		local download_success=0

		# Check if we have a working (non-snap) curl
		if command_exists curl && [[ $snap_curl -eq 0 ]]; then
			if [[ $progress -eq 1 ]]; then
				if curl -#fL "$url" -o "$output_file"; then
					download_success=1
				fi
			elif curl -fsSL "$url" -o "$output_file" 2>/dev/null; then
				download_success=1
			fi
		# Try wget for both no curl and the broken snap curl
		elif command_exists wget; then
			if [[ $progress -eq 0 ]]; then
				if wget -q "$url" -O "$output_file" 2>/dev/null; then
					download_success=1
				fi
			elif [[ "$(wget --help 2>&1)" == *--show-progress* ]]; then
				if wget -q --show-progress "$url" -O "$output_file"; then
					download_success=1
				fi
			# BusyBox wget (Alpine) has no --show-progress, but draws its own
			# bar when it isn't quiet.
			elif wget "$url" -O "$output_file"; then
				download_success=1
			fi
		# If we can't fall back from broken snap curl to wget, report the broken snap curl
		elif [[ $snap_curl -eq 1 ]]; then
			error "curl installed with snap cannot download files due to missing permissions. Please uninstall it and reinstall curl with a different package manager (e.g., apt)."
		else
			error "Neither curl nor wget found. Please install one of them."
		fi

		if [[ $download_success -eq 1 ]]; then
			return 0
		fi

		# Download failed
		if [[ $attempt -lt $MAX_RETRIES ]]; then
			if [[ $attempt -ge 3 ]]; then
				warn "Download failed (attempt $attempt/$MAX_RETRIES). Retrying in ${delay}s..."
			fi
			sleep "$delay"
			delay=$((delay * 2))
			attempt=$((attempt + 1))
		else
			warn "Download failed after $MAX_RETRIES attempts. URL: $url"
			return 1
		fi
	done
}

# Download a release tarball, with a progress bar. Non-zero on failure.
download_file() {
	local url="$1"
	local output_file="$2"
	local version="${3:-}"

	log "Downloading $(basename "$url") (${LIGHT_GREEN}${version}${NC})..."

	# Use secure temporary file
	local temp_file
	temp_file=$(mktemp "$(dirname "$output_file")/tmp.XXXXXX") || return 1

	# Download to temp file first, then atomic move
	if ! downloader "$url" "$temp_file" 1; then
		rm -f "$temp_file"
		return 1
	fi
	mv "$temp_file" "$output_file"
}

# Verify SHA256 checksum
verify_checksum() {
	local file="$1"
	local expected_checksum="$2"

	log "Verifying checksum..."

	local actual_checksum
	actual_checksum=$($SHA256_CMD "$file" | cut -d' ' -f1)

	if [[ "$actual_checksum" != "$expected_checksum" ]]; then
		error "Checksum verification failed!\nExpected: $expected_checksum\nActual: $actual_checksum"
	fi

	success "Checksum verified"
}

# Extract one string field from a small registry JSON document.
#   $1 = json file, $2 = jq filter, $3 = key name for the grep/sed fallback
json_field() {
	local file="$1" filter="$2" key="$3"
	if [[ -n "$JQ" ]]; then
		"$JQ" -r "${filter} // empty" "$file" 2>/dev/null || true
	else
		grep -o "\"${key}\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" "$file" \
			| head -1 \
			| sed 's/.*:[[:space:]]*"\([^"]*\)"/\1/' || true
	fi
}

# Map the detected platform to the npm package's platform tag.
npm_platform_tag() {
	case "$1" in
		darwin_amd64) echo "darwin-x64" ;;
		darwin_arm64) echo "darwin-arm64" ;;
		linux_amd64) echo "linux-x64" ;;
		linux_arm64) echo "linux-arm64" ;;
		*) return 1 ;;
	esac
}

# Check an npm tarball against the registry's digest: the SHA-512 `integrity`
# when openssl is available, else the SHA-1 `shasum`. Non-zero on mismatch.
verify_npm_tarball() {
	local file="$1" integrity="$2" sha1="$3" expected actual

	log "Verifying checksum..."

	if [[ "$integrity" == sha512-* ]] && command_exists openssl; then
		expected="$integrity"
		actual="sha512-$(openssl dgst -sha512 -binary "$file" | openssl base64 -A)"
	elif [[ -n "$sha1" ]]; then
		expected="$sha1"
		actual=$($SHA1_CMD "$file" | cut -d' ' -f1)
	else
		warn "The registry gave no checksum for this tarball"
		return 1
	fi

	if [[ "$actual" != "$expected" ]]; then
		warn "Checksum verification failed!\nExpected: $expected\nActual: $actual"
		return 1
	fi

	success "Checksum verified"
}

# Fetch latest CLI version from GitHub API with fallback.
#
# One quick try rather than `downloader`: its retry loop spent a minute in
# backoff on a rate-limited (403) or offline API and then exited from inside
# this $(…), killing the install before the fallback below was ever reached.
fetch_latest_version() {
	local api_url="https://api.github.com/repos/${GITHUB_REPO}/releases/latest"
	local fetch=(curl -fsSL --max-time 15)
	if ! command_exists curl; then
		fetch=(wget -qO- --timeout=15)
	fi

	log "Fetching latest version from GitHub..."

	local version
	version=$("${fetch[@]}" "$api_url" 2>/dev/null | grep '"tag_name":' | head -n 1 | sed -E 's/.*"([^"]+)".*/\1/') || true

	if [[ -n "$version" ]]; then
		echo "$version"
		return
	fi

	warn "Failed to fetch from GitHub API, using fallback: $FALLBACK_VERSION"
	echo "$FALLBACK_VERSION"
}

fetch_latest_version_from_metadata() {
	local metadata_url="${OSM_URL%/}/metadata.json"
	local version
	local tmp_file

	log "Fetching latest version from ${metadata_url}..."
	tmp_file=$(mktemp)
	downloader "$metadata_url" "$tmp_file" || error "Failed to download ${metadata_url}"
	version=$(grep -E '"version"\s*:' "$tmp_file" | head -n 1 | sed -E 's/.*"version"\s*:\s*"([^\"]+)".*/\1/')
	rm -f "$tmp_file"

	if [[ -z "$version" ]]; then
		error "Failed to fetch latest version from ${metadata_url}"
	fi

	echo "$version"
}

# Check for existing osmedeus installation
check_existing_installation() {
	local binary_path="$BIN_DIR/osmedeus"
	local existing_binary=""

	# Check in BIN_DIR first
	if [[ -x "$binary_path" ]]; then
		existing_binary="$binary_path"
	# Also check if osmedeus is in PATH (might be installed elsewhere)
	elif command_exists osmedeus; then
		existing_binary=$(command -v osmedeus)
	fi

	if [[ -n "$existing_binary" ]]; then
		# Try to get the current version (one run of the old binary, not two)
		local version_info old_version old_build
		version_info=$("$existing_binary" version 2>/dev/null || true)
		old_version=$(grep 'Version:' <<<"$version_info" || true)
		old_build=$(grep 'Build:' <<<"$version_info" || true)

		if [[ -n "$old_version" && -n "$old_build" ]]; then
			warn "Detected existing osmedeus installation at $existing_binary (${old_version} - ${old_build})"
		else
			warn "Detected existing osmedeus installation at $existing_binary"
		fi
		log "Will replace with the new version..."
	fi
}

# Install Osmedeus CLI binary: npm first, GitHub releases if that fails. A
# mirror ($OSM_URL) or OSM_SOURCE=github goes straight to the GitHub path.
install_osmedeus_binary() {
	local platform="$1"
	local version="${OSM_VERSION:-}"

	# Check for existing installation before proceeding
	check_existing_installation

	mkdir -p "$OSM_HOME" "$BIN_DIR"

	if [[ $OSM_URL_ENV_SET -eq 1 && -n "${OSM_URL}" ]] || [[ "${OSM_SOURCE:-npm}" == "github" ]]; then
		install_from_github "$platform" "$version"
	elif ! install_from_npm "$platform" "$version"; then
		rm -rf "$OSM_HOME"/osm-install-*
		warn "Installing from npm failed; falling back to GitHub releases"
		install_from_github "$platform" "$version"
	fi

	success "Osmedeus CLI binary installed to $BIN_DIR/osmedeus"
}

# Primary source: the per-platform @j3ssie/osmedeus package, served from the
# npm registry's CDN. It runs as an `if` condition, where `set -e` does not
# apply, so every step returns explicitly and the caller can fall back.
install_from_npm() {
	local platform="$1"
	local version="${2#v}"
	local tag
	tag=$(npm_platform_tag "$platform") || return 1

	local manifest="$OSM_HOME/osm-install-manifest.json"
	local tarball_path="$OSM_HOME/osm-install-tarball.tgz"
	local extract_dir="$OSM_HOME/osm-install-extract"

	# Fewer retries than the default: a dead registry should hand over to
	# GitHub in seconds, not after a minute of backoff.
	if [[ -z "$version" ]]; then
		log "Resolving ${NPM_PKG}@latest from npm..."
		MAX_RETRIES=3 downloader "${NPM_REGISTRY}/${NPM_PKG_ENC}/latest?t=$(date +%s)" "$manifest" || return 1
		version=$(json_field "$manifest" '.version' 'version')
		[[ -n "$version" ]] || return 1
	fi

	MAX_RETRIES=3 downloader "${NPM_REGISTRY}/${NPM_PKG_ENC}/${version}-${tag}?t=$(date +%s)" "$manifest" || return 1
	local tarball_url integrity sha1
	tarball_url=$(json_field "$manifest" '.dist.tarball' 'tarball')
	integrity=$(json_field "$manifest" '.dist.integrity' 'integrity')
	sha1=$(json_field "$manifest" '.dist.shasum' 'shasum')
	[[ -n "$tarball_url" ]] || return 1

	log "Installing version: ${LIGHT_GREEN}v${version}${NC} (npm: ${tag})"

	rm -rf "$extract_dir" && mkdir -p "$extract_dir" || return 1
	MAX_RETRIES=3 download_file "$tarball_url" "$tarball_path" "v${version}" || return 1
	verify_npm_tarball "$tarball_path" "$integrity" "$sha1" || return 1

	log "Extracting tarball..."
	tar -xzf "$tarball_path" -C "$extract_dir" || return 1

	# The package ships the binary gzipped at package/vendor/<tag>/osmedeus.gz
	local gz_path="$extract_dir/package/vendor/$tag/osmedeus.gz"
	if [[ ! -f "$gz_path" ]]; then
		warn "No vendor/$tag/osmedeus.gz in the npm tarball"
		return 1
	fi
	gzip -dc "$gz_path" > "$extract_dir/osmedeus" || return 1
	chmod +x "$extract_dir/osmedeus" || return 1
	mv "$extract_dir/osmedeus" "$BIN_DIR/osmedeus" || return 1

	rm -f "$manifest" "$tarball_path"
	rm -rf "$extract_dir"
}

# Fallback source, and the only one for a mirror or a nightly: GitHub releases
# (or $OSM_URL), verified against the release's checksums.txt.
install_from_github() {
	local platform="$1"
	local version="$2"
	local binary_name="osmedeus"

	if [[ -z "$version" ]]; then
		if [[ $OSM_URL_ENV_SET -eq 1 && -n "${OSM_URL}" ]]; then
			version=$(fetch_latest_version_from_metadata)
		else
			version=$(fetch_latest_version)
		fi
	fi
	if [[ "$version" != v* ]]; then
		version="v${version}"
	fi
	log "Installing version: ${LIGHT_GREEN}${version}${NC}"

	# Strip 'v' prefix for tarball filename (e.g., v5.0.0 -> 5.0.0)
	local version_no_v="${version#v}"
	local tarball_name="osmedeus_${version_no_v}_${platform}.tar.gz"
	local base_url
	if [[ $OSM_URL_ENV_SET -eq 1 && -n "${OSM_URL}" ]]; then
		base_url="${OSM_URL%/}"
	else
		base_url="https://github.com/${GITHUB_REPO}/releases/download/${version}"
	fi
	local tarball_url="${base_url}/${tarball_name}"
	local checksum_url="${base_url}/checksums.txt"

	local tarball_path="$OSM_HOME/osm-install-tarball.tar.gz"
	local checksum_path="$OSM_HOME/osm-install-checksums.txt"
	local extract_dir="$OSM_HOME/osm-install-extract"

	mkdir -p "$extract_dir"

	# Download checksum first
	downloader "$checksum_url" "$checksum_path" || error "Failed to download ${checksum_url}"

	# Extract expected checksum for our tarball
	local expected_checksum
	expected_checksum=$(grep "$tarball_name" "$checksum_path" | awk '{print $1}')

	if [[ -z "$expected_checksum" ]]; then
		error "Could not find checksum for $tarball_name in checksums file"
	fi

	# Download tarball
	download_file "$tarball_url" "$tarball_path" "$version" || error "Failed to download ${tarball_url}"

	# Verify checksum
	verify_checksum "$tarball_path" "$expected_checksum"

	# Extract tarball
	log "Extracting tarball..."
	tar -xzf "$tarball_path" -C "$extract_dir"

	# Move binary to BIN_DIR
	local binary_path="$BIN_DIR/$binary_name"
	mv "$extract_dir/$binary_name" "$binary_path"

	# Make executable
	chmod +x "$binary_path"

	# Clean up
	rm -f "$tarball_path" "$checksum_path"
	rm -rf "$extract_dir"
}

# Update PATH in shell profile
update_shell_profile() {
	# Detect shell from $SHELL or default
	local default_shell="bash"
	if [[ "$(uname -s)" == "Darwin" ]]; then
		default_shell="zsh"
	fi

	local shell_name
	shell_name=$(basename "${SHELL:-$default_shell}")

	local shell_profiles=()
	local refresh_command=""

	case "$shell_name" in
		zsh)
			shell_profiles=("$HOME/.zshrc")
			refresh_command="exec \$SHELL"
			;;
		bash)
			# Add to both .bashrc (interactive) and .bash_profile (login shells)
			[[ -f "$HOME/.bashrc" ]] && shell_profiles+=("$HOME/.bashrc")
			[[ -f "$HOME/.bash_profile" ]] && shell_profiles+=("$HOME/.bash_profile")
			# If neither exists, create .bashrc
			[[ ${#shell_profiles[@]} -eq 0 ]] && shell_profiles=("$HOME/.bashrc")
			refresh_command="source ~/.bashrc"
			;;
		fish)
			shell_profiles=("$HOME/.config/fish/config.fish")
			refresh_command="source ~/.config/fish/config.fish"
			;;
		*)
			warn "Unknown shell: $shell_name"
			warn "Please add $BIN_DIR to your PATH manually:"
			echo "  export PATH=\"$BIN_DIR:\$PATH\""
			return
			;;
	esac

	local updated=0
	for shell_profile in "${shell_profiles[@]}"; do
		# Check if PATH is already updated
		if [[ -f "$shell_profile" ]] && grep -q "$BIN_DIR" "$shell_profile" 2>/dev/null; then
			log "PATH already configured in $shell_profile"
			continue
		fi

		# Create config file if it doesn't exist
		if [[ ! -f "$shell_profile" ]]; then
			mkdir -p "$(dirname "$shell_profile")"
			touch "$shell_profile"
		fi

		# Add to PATH
		{
			echo ""
			echo "# Osmedeus CLI"
			echo "export PATH=\"$BIN_DIR:\$PATH\""
		} >> "$shell_profile"

		success "Added $BIN_DIR to PATH in $shell_profile"
		updated=1
	done

	if [[ $updated -eq 1 ]]; then
		echo ""
		log "To activate the PATH, run:"
		echo -e "  ${LIGHT_GREEN}${refresh_command}${NC}"
	fi
}

# Main installation
main() {
	log "Starting Osmedeus CLI installation..."

	# Check prerequisites
	check_prereqs
	check_workflow_deps

	# Detect platform
	local platform
	platform=$(detect_platform)
	log "Detected platform: $platform"

	# Install binary
	install_osmedeus_binary "$platform"

	# Update shell profile
	update_shell_profile

	echo ""
	success "Osmedeus CLI installed successfully!"
	log "Run ${LIGHT_GREEN}osmedeus health${NC} (after restarting your shell) to validate your setup and generate a sample config"
	log "Visit ${LIGHT_GREEN}https://docs.osmedeus.org${NC} for documentation"
	log "Run ${LIGHT_GREEN}osmedeus install base --preset${NC} to download the ready-to-use workflow and then start scanning"

	# By path: on a fresh install $BIN_DIR is not on this shell's PATH yet.
	if [[ "${OSM_HEALTH_CHECK:-0}" == 1 ]]; then
		echo ""
		"$BIN_DIR/osmedeus" health
	fi
}

main "$@"
