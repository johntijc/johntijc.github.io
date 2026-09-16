#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf 'Usage: bash %s\n' "${0##*/}"
  printf 'Create .github/workflows/deploy.yml in the directory containing this script.\n'
}

if [[ $# -eq 1 && ( $1 == --help || $1 == -h ) ]]; then
  usage
  exit 0
fi

if [[ $# -ne 0 ]]; then
  usage >&2
  exit 1
fi

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
workflow_dir="$script_dir/.github/workflows"
workflow_file="$workflow_dir/deploy.yml"
if [[ -e "$workflow_file" || -L "$workflow_file" ]]; then
  printf 'Refusing to overwrite existing workflow: %s\n' "$workflow_file" >&2
  exit 1
fi

mkdir -p -- "$workflow_dir"
# Keep shell variables and GitHub expressions literal inside the workflow.
# Noclobber also protects against a file appearing after the existence check.
set -o noclobber
cat > "$workflow_file" <<'GITHUB_WORKFLOW'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]   # change if your default branch isn't main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - name: Install
        run: npm ci

      - name: Build & Export
        run: |
          npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out   # next export writes to "out"

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
GITHUB_WORKFLOW

printf 'Created %s\n' "$workflow_file"
cat <<'NEXT_STEPS'
Next steps:
  1. Edit the workflow's push branch if your default branch is not main.
  2. Enable GitHub Actions in the new repository if disabled.
  3. In Settings > Pages > Build and deployment, set Source to GitHub Actions.
  4. Commit and push .github/workflows/deploy.yml to your default branch.
NEXT_STEPS
