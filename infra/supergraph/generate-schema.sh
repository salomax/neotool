#!/bin/bash
set -e

echo "Generating supergraph schema..."

# Accept ELv2 license
export APOLLO_ELV2_LICENSE=accept

# Generate the supergraph schema
rover supergraph compose \
  --config ./supergraph.yaml \
  > ./supergraph.graphql

echo "Supergraph schema generated successfully!"
echo "File size: $(wc -c < supergraph.graphql) bytes"
echo "Location: $(pwd)/supergraph.graphql"
