#!/bin/bash
set -euo pipefail

cp ./manifests/dev/manifest.json ./web/manifest.json 

pushd $(dirname "$0")/../web

pnpm run gen:dojo
prettier --write ./src/dojo/generated