#!/usr/bin/env sh
docker build --tag vpeurala/purescript-possu-db:latest .
docker run --detach --env POSTGRES_PASSWORD=leipuri --publish 5432:5432 --volume ~/.docker/possu/data:/var/lib/postgresql/data vpeurala/purescript-possu-db:latest

