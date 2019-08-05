# Start writing your Dockerfile easily
FROM docker build -t myimage:latest -f- https://github.com/CodeInas/ISBN-API <<EOF

RUN apk update && \
    apk add --no-cache vim bash

