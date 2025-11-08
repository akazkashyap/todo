#!/bin/sh

# Set a default value for APP_PREFIX if not provided
STATIC_URL_PATH=${STATIC_URL_PATH:-/reactapp/}

# Replace the placeholder with the actual value
sed -i "s|\${STATIC_URL_PATH}|${STATIC_URL_PATH}|g" /etc/nginx/conf.d/default.conf  

# Start Nginx
nginx -g "daemon off;"