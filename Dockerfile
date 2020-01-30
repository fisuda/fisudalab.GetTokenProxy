FROM ubuntu:18.04
WORKDIR /
COPY package.json /
RUN apt-get update -y && \
    apt-get install -y nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    npm install
COPY server.js /
COPY config.js /
ENTRYPOINT ["/usr/bin/node"]
CMD ["server.js"]
