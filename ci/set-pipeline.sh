#!/bin/bash

set -e
set -o pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="local"
PIPELINE="yootchi"

fly -t $TARGET set-pipeline --pipeline $PIPELINE --config $DIR/pipeline.yml
