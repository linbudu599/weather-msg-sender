#!/bin/sh

set -eux

CITY=WenChang
LANGUAGE="zh-CN"

rm stat.json

curl \
  -H "Accept-Language: $LANGUAGE" \
  -o stat.json \
  wttr.in/$CITY?format=j1
