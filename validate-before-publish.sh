#!/bin/bash

# Pre-publication validation script for mondial-relay widget
# Run this before publishing to npm to ensure everything is correct

set -e

echo "🔍 Mondial Relay Widget - Pre-Publication Check"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track failures
FAILED=0

# Helper function
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        FAILED=$((FAILED + 1))
    fi
}

# Helper function for warnings
warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "1️⃣  Checking files..."
echo ""

# Check if key files exist
test -f "package.json"
check "package.json exists"

test -f "tsconfig.json"
check "tsconfig.json exists"

test -f "src/mondial-relay.ts"
check "src/mondial-relay.ts exists"

test -f "README.md"
check "README.md exists"

test -f "LICENSE"
check "LICENSE exists"

test -d "dist"
check "dist/ directory exists"

echo ""
echo "2️⃣  Checking package.json..."
echo ""

# Check version format
grep -q '"version": "[0-9]*\.[0-9]*\.[0-9]*"' package.json
check "Version is in semver format"

# Check for required fields
grep -q '"name"' package.json
check "name field present"

grep -q '"main"' package.json
check "main field present"

grep -q '"module"' package.json
check "module field present"

grep -q '"types"' package.json
check "types field present"

echo ""
echo "3️⃣  Checking build artifacts..."
echo ""

test -f "dist/mondial-relay.js"
check "dist/mondial-relay.js (CJS) exists"

test -f "dist/mondial-relay.mjs"
check "dist/mondial-relay.mjs (ESM) exists"

test -f "dist/mondial-relay.d.ts"
check "dist/mondial-relay.d.ts (TypeScript defs) exists"

# Check file sizes
js_size=$(wc -c < "dist/mondial-relay.js" 2>/dev/null || echo 0)
if [ "$js_size" -gt 1000 ]; then
    echo -e "${GREEN}✅ dist/mondial-relay.js is ${js_size} bytes${NC}"
else
    echo -e "${RED}❌ dist/mondial-relay.js seems too small (${js_size} bytes)${NC}"
    FAILED=$((FAILED + 1))
fi

echo ""
echo "4️⃣  Checking documentation..."
echo ""

# Check README contains examples
grep -q "MondialRelay.init" README.md
check "README contains usage examples"

grep -q "React" README.md
check "README mentions React"

grep -q "Vue" README.md
check "README mentions Vue"

grep -q "npm install" README.md
check "README has installation instructions"

# Check other docs
test -f "DEVELOPMENT.md"
check "DEVELOPMENT.md exists"

test -f "PUBLICATION.md"
check "PUBLICATION.md exists"

test -f "CHANGELOG.md"
check "CHANGELOG.md exists"

echo ""
echo "5️⃣  Checking example files..."
echo ""

test -f "examples/React.tsx"
check "examples/React.tsx exists"

test -f "examples/Vue.vue"
check "examples/Vue.vue exists"

test -f "example.html"
check "example.html exists"

echo ""
echo "6️⃣  Checking configuration..."
echo ""

test -f ".gitignore"
check ".gitignore exists"

grep -q "node_modules" .gitignore
check ".gitignore includes node_modules"

grep -q "dist/" .gitignore
check ".gitignore includes dist/"

echo ""
echo "7️⃣  Summary"
echo "================================================"
echo ""

if [ "$FAILED" -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Ready for publication.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. npm login"
    echo "2. npm publish"
    echo ""
else
    echo -e "${RED}⚠️  $FAILED check(s) failed.${NC}"
    echo "Please fix the issues above before publishing."
    exit 1
fi

echo ""
echo "Additional reminders:"
echo "- Update author in package.json with your name"
echo "- Update repository URL in package.json"
echo "- Verify your code: yarn test"
echo "- Try dry run: npm publish --dry-run"
echo ""

