#!/bin/sh

echo ">> Building contract"

near-sdk-js build src/nft.ts build/nft.wasm
