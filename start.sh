#!/bin/sh

# Debug: Show what's in dist
echo "=== Runtime: Contents of dist ==="
ls -la dist/ | head -20

echo "=== Runtime: Logo files ==="
ls -la dist/logo*.webp 2>&1 || echo "Logo files not found"

echo "=== Runtime: Testing file access ==="
test -f dist/logo-light.webp && echo "✅ logo-light.webp EXISTS" || echo "❌ logo-light.webp MISSING"
test -d dist/assets && echo "✅ assets directory EXISTS" || echo "❌ assets directory MISSING"
test -d dist/fonts && echo "✅ fonts directory EXISTS" || echo "❌ fonts directory MISSING"

echo "=== Starting serve ==="
PORT=${PORT:-8080}
echo "Serving on port: $PORT"
serve dist -l $PORT

