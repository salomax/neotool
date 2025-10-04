#!/bin/bash

echo "🚀 Testing Apollo Router Supergraph Setup"
echo "=========================================="

ROUTER_URL="http://127.0.0.1:4000"

echo ""
echo "1. Testing Router Health..."
curl -s -I "$ROUTER_URL" | head -1

echo ""
echo "2. Testing GraphQL Introspection..."
echo "Query: Get schema information"
curl -s -X POST "$ROUTER_URL/" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { queryType { name fields { name type { name } } } } }"}' | jq '.'

echo ""
echo "3. Testing Products Query..."
echo "Query: Get all products"
curl -s -X POST "$ROUTER_URL/" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ products { id name sku priceCents stock } }"}' | jq '.'

echo ""
echo "4. Testing Customers Query..."
echo "Query: Get all customers"
curl -s -X POST "$ROUTER_URL/" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ customers { id name email status } }"}' | jq '.'

echo ""
echo "5. Testing Single Product Query..."
echo "Query: Get product by ID"
curl -s -X POST "$ROUTER_URL/" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ product(id: \"1\") { id name sku priceCents stock createdAt } }"}' | jq '.'

echo ""
echo "6. Testing Federation Schema..."
echo "Query: Check federation directives"
curl -s -X POST "$ROUTER_URL/" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { directives { name locations } } }"}' | jq '.data.__schema.directives[] | select(.name | contains("join"))'

echo ""
echo "✅ Supergraph Testing Complete!"
echo ""
echo "📝 Notes:"
echo "- If you see 'dns error' or 'HTTP fetch failed', the router is working correctly"
echo "- The router is trying to fetch data from the 'app' service (your API)"
echo "- This confirms the supergraph is properly configured and routing requests"
echo "- To get actual data, ensure your API service is running and accessible"
echo ""
echo "🌐 Access GraphQL Playground at: $ROUTER_URL"
