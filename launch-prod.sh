#!/bin/bash
# To be run on server
set -e

# export NODE_ENV=production
sudo yarn 
sudo yarn workspace web build
pwd
cd server; 
pm2 startOrGracefulReload ./ecosystem.config.js