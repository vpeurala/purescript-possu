#!/usr/bin/env sh
docker ps -a | tail -n +2 | awk '{print $1}' | xargs docker rm -f
