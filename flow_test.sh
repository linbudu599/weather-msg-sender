#!/bin/sh

set -eux

node_modules/.bin/ts-node ./server/fetch.ts
node_modules/.bin/ts-node ./translate/index.ts
node_modules/.bin/ts-node ./server/send.ts