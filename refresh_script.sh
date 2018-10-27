#!/bin/bash

echo ""
read -p "Refresh token: " REFRESH 
echo ""

RESP=`curl -s -d "{\"refresh\": \"$REFRESH\"}" -H "Content-type: application/json" http://localhost:8000/token`

echo $RESP
