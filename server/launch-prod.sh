#!/bin/bash
# To be run on server
set -e

yarn 
yarn workspace web build
pm2 startOrGracefulReload ./ecosystem.config.js