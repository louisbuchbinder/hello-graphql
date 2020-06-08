FROM node:14.4-alpine
ARG DIR=/app
WORKDIR $DIR
COPY package.json $DIR/
RUN npm install
COPY . $DIR/
RUN npm test

CMD ["/usr/local/bin/node", "server"]
