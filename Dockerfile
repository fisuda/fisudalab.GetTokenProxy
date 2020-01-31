FROM node:10.17.0-slim
COPY package.json /
RUN npm install
COPY server.js /
COPY config.js /
ENTRYPOINT ["/usr/local/bin/node"]
CMD ["server.js"]
