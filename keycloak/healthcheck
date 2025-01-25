#!/bin/bash

# Opening file descriptor for read/write
exec 3<>/dev/tcp/localhost/9000

# Sending HTTP request
cat >&3 <<EOF
HEAD /health/ready HTTP/1.1
Host: localhost:9000
Connection: close

EOF

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
