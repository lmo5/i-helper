#!/bin/bash

# Allow local X11 connections
xhost +local:

# Set SSL-related environment variables
export RUST_BACKTRACE=1
export RUST_LOG=debug
export SSL_CERT_DIR=/etc/ssl/certs
export SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

# Start Docker Compose
docker compose up