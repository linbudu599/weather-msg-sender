#!/bin/sh

set -eux

CITY=NanChang
LANGUAGE="zh-CN"

rm ./tmp/stat.json

curl \
  -H "Accept-Language: $LANGUAGE" \
  -o ./tmp/stat.json \
  wttr.in/$CITY?format=j1

node ./translate
node ./translate/result.js