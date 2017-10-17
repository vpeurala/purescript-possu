#!/usr/bin/env sh
docker ps -a | grep -v purescript-possu-db | tail -n +2 | awk '{print $1}' | xargs docker rm -f
