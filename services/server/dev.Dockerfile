FROM node:16.10.0-alpine AS builder

COPY ./app/package.json /home/node/app/package.json
COPY ./app/yarn.lock /home/node/app/yarn.lock
WORKDIR /home/node/app

RUN yarn --frozen-lockfile

COPY ./app /home/node/app

FROM dzek69/nodemin:16.10.0-youtube

RUN apk add --no-cache tzdata
ENV TZ=Europe/Warsaw

COPY --from=builder --chown=node:node /home/node/app /home/node/app
WORKDIR /home/node/app

USER node

ENV TS_NODE_FILES=true
CMD ["./node_modules/.bin/nodemon"]
