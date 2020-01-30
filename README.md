# Proxy Server to get a token from Keyrock for FISUDA Lab

```
    tokenproxy:
        image: fisuda/gettokenproxy
        environment:
            - KEYROCK_URL=https://keyrock/oauth2/token
            - PORT=8000
            - CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            - CLIENT_SECRET=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            - PATH=/token
```
