#!/bin/bash
# To be run on server
set -e

# export NODE_ENV=production
yarn 
yarn workspace web build
pwd
pm2 startOrGracefulReload ./ecosystem.config.js