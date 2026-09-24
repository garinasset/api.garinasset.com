#!/bin/bash

set -e

hostname

# 加载 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "==> Node: $(node -v)"
echo "==> npm: $(npm -v)"
echo "==> Node path: $(which node)"
echo "==> npm path: $(which npm)"

APP_DIR="/home/deploy/api.garinasset.com"

cd "$APP_DIR"

echo "==> Install dependencies"
npm ci

echo "==> Build"
npm run build

echo "==> Reload PM2"
pm2 reload api.garinasset.com

echo "==> Deployment completed"