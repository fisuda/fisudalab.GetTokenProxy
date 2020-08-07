ARG IMAGE_TAG=3.12
FROM alpine:${IMAGE_TAG} AS builder

COPY *.js package.json /opt/tokenProxy/

RUN apk add --no-cache --update nodejs nodejs-npm && \
    cd /opt/tokenProxy/ && \
    echo "INFO: npm install --production..." && \
    npm install --production

FROM alpine:${IMAGE_TAG} AS runner

COPY --from=builder /opt/tokenProxy /opt/tokenProxy
WORKDIR /opt/tokenProxy
RUN apk add --no-cache --update nodejs

USER guest
ENV NODE_ENV=production

ENTRYPOINT ["/usr/bin/node"]
CMD ["server.js"]
