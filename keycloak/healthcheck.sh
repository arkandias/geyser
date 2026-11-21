#!/bin/bash

# Opening file descriptor for read/write
exec 3<>/dev/tcp/localhost/9000

# Sending HTTP request
# (HTTP requires CRLF line endings)
printf 'HEAD /health/ready HTTP/1.1\r\nHost: localhost:9000\r\nConnection: close\r\n\r\n' >&3

# Reading HTTP response
response="$(timeout 1 cat <&3)"

# Closing file descriptor
exec 3<&-
exec 3>&-

# Check HTTP response
case "${response}" in
HTTP/1.[01]\ 200\ *)
    exit 0
    ;;
*)
    echo "Error Response: ${response}" >&2
    exit 1
    ;;
esac
