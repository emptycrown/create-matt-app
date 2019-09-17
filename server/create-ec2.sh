#!/bin/bash
# Sample script to initialize an EC2 app
set -e

if [ $(id -u) != "0" ]
then
    echo "FAILED: Run with sudo!"
    exit
fi

sudo apt-get update
sudo apt-get install -y nginx

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

# Yarn install
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn

# Then setup SSL via Let's Encrypt
sudo apt-get update
sudo apt-get install -y software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get update
sudo apt-get install -y certbot python-certbot-nginx
# sudo certbot certonly --nginx

# Other dependencies
npm install -g pm2
