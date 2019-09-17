#!/bin/bash
# To be run on server
set -e

# export NODE_ENV=production
sudo yarn 
yarn workspace web build
cd server; 
pm2 startOrGracefulReload ./ecosystem.config.js