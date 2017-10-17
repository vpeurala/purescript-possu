#!/usr/bin/env sh
docker build --tag vpeurala/purescript-possu-db:latest .
docker rm purescript-possu-db-latest
docker run --publish 5432:5432 --env POSTGRES_PASSWORD=leipuri --detach vpeurala/purescript-possu-db:latest

