#!/usr/bin/env bash
cd client
./node_modules/.bin/webpack -p
mv ./dist/bundle.js ../server/public/bundle.js

