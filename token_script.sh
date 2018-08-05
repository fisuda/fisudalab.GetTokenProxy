#!/bin/bash

echo ""
read -p "Username: " USER
read -s -p "Password: " PASSWORD
echo ""

RESP=`curl -s -d "{\"username\": \"$USER\", \"password\":\"$PASSWORD\"}" -H "Content-type: application/json" http://localhost:8000/token`

echo $RESP
