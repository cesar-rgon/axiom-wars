#!/usr/bin/env bash
# Axiom Wars - installer for Linux and macOS (Apple Silicon and Intel).
# Goes to your home folder, downloads the latest version, installs it in
# ~/AxiomWars (replacing the previous one) and starts the game.
# No administrator rights needed. Run it again to update:
#     bash install.sh
# The game's settings and saved games live outside that folder and are kept.
set -euo pipefail

BASE="${AXIOMWARS_BASE:-https://github.com/cesar-rgon/axiom-wars/releases/latest/download}"

os=$(uname -s)
arch=$(uname -m)
if [ "$os" = Darwin ] && [ "$(sysctl -n hw.optional.arm64 2>/dev/null || echo 0)" = 1 ]; then
  arch=arm64 # a terminal running under Rosetta reports x86_64 on an Apple Silicon Mac
fi
case "$os/$arch" in
  Linux/x86_64)  asset=AxiomWars-Linux-x64.tar.gz ;;
  Darwin/arm64)  asset=AxiomWars-Mac-arm64.tar.gz ;;
  Darwin/x86_64) asset=AxiomWars-Mac-x64.tar.gz ;;
  *) echo "Axiom Wars has no build for $os $arch." >&2; exit 1 ;;
esac

cd "$HOME"
tmp=$(mktemp -d "${TMPDIR:-/tmp}/axiomwars.XXXXXX")
trap 'rm -rf "$tmp"' EXIT

echo "Downloading the latest Axiom Wars ($asset)..."
curl -fL --progress-bar -o "$tmp/$asset" "$BASE/$asset"

echo "Unpacking..."
tar -xzf "$tmp/$asset" -C "$tmp"
[ -f "$tmp/AxiomWars/AxiomWars" ] || { echo "The download does not contain AxiomWars/AxiomWars." >&2; exit 1; }

rm -rf "$HOME/AxiomWars"
mv "$tmp/AxiomWars" "$HOME/AxiomWars"
chmod +x "$HOME/AxiomWars/AxiomWars"

echo "Installed in $HOME/AxiomWars"
[ -n "${AXIOMWARS_NO_RUN:-}" ] && exit 0
echo "Starting the game..."
exec "$HOME/AxiomWars/AxiomWars"
