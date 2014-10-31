#!/bin/sh
ok=true
BUILDER=$PWD/$(dirname $0)/build.js

for example in test/examples/*; do
  (
    cd ${example}

    rm -rf output && mkdir output
    if node $BUILDER output/out.js && node output/out.js; then
      echo "✓ ${example}"
      rm -rf output
    else
      echo "✘ ${example}"
      ok=false
    fi
  )
done

if ${ok} == "true"; then
  exit 0
else
  exit 1
fi
