#!/usr/bin/env sh
docker images --all | grep -v ubuntu | grep -v -e 'amd64/postgres.*10' | grep -v -e 'vpeurala/purescript-possu-db.*latest' | tail -n +2 | awk '{print $3}' | xargs docker rmi -f
