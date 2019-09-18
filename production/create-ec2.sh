#!/bin/bash
set -e

if [ $(id -u) != "0" ]
then
    echo "FAILED: Run with sudo!"
    exit
fi

apt-get update
apt-get install -y nginx

curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs

# Yarn install
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update && apt-get install -y yarn

# Other dependencies
yarn global add pm2 --prefix /usr/local

# Add NGINX conf.d file, remove symlink for sites-enabled
rm /etc/nginx/sites-enabled/default
cp default.conf /etc/nginx/conf.d

# Then setup SSL via Let's Encrypt
apt-get update
apt-get install -y software-properties-common
add-apt-repository universe
add-apt-repository -y ppa:certbot/certbot
apt-get update
apt-get install -y certbot python-certbot-nginx
certbot certonly --nginx

service nginx restart