#!/usr/bin/env bash
cd client
./node_modules/.bin/webpack -p
mv ./dist/bundle.js.map ../server/public/bundle.min.js

