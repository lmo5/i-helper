#!/bin/bash

# Exit on error
set -e

# Build and package frontend
cd i-helper-frontend
npm install
npm run build
npm run package

# Build backend for multiple platforms
cd ../i-helper-backend

# Linux
cargo build --release
mv target/release/i-helper-backend ../i-helper-frontend/dist/i-helper-backend-linux

# Windows
cargo build --release --target x86_64-pc-windows-gnu
mv target/x86_64-pc-windows-gnu/release/i-helper-backend.exe ../i-helper-frontend/dist/i-helper-backend-windows.exe

# macOS
cargo build --release --target x86_64-apple-darwin
mv target/x86_64-apple-darwin/release/i-helper-backend ../i-helper-frontend/dist/i-helper-backend-macos

echo "Build completed successfully!"