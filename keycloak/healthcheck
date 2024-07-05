#!/bin/bash
# Copyright (c) 2024 Julien Hauseux <julien.hauseux@univ-lille.fr>

# opening file descriptor for read/write
exec 3<>/dev/tcp/localhost/8080

# sending HTTP request
cat >&3 <<EOF
HEAD /health/ready HTTP/1.1
Host: localhost:8080
Connection: close

EOF

# reading HTTP response
response=$(timeout 1 cat <&3)

# closing file descriptor
exec 3<&-
exec 3>&-

# check HTTP response
case $response in
  HTTP/1.[01]\ 200\ *)
    exit 0
    ;;
  *)
    echo "Incorrect response:"
    echo "$response"
    exit 1
    ;;
esac
