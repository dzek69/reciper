FROM node:16.10.0-alpine AS builder

COPY ./app/package.json ./app/yarn.lock /home/node/app/
WORKDIR /home/node/app

RUN yarn --frozen-lockfile

COPY ./app /home/node/app

RUN yarn compile:esm
WORKDIR /home/node/app/esm
COPY ./app/package.json ./app/yarn.lock /home/node/app/esm/
# RUN mv .yarnclean.txt .yarnclean @TODO
RUN yarn --production --frozen-lockfile

FROM dzek69/nodemin:16.10.0-youtube

RUN apk add --no-cache tzdata
ENV TZ=Europe/Warsaw

COPY --from=builder --chown=node:node /home/node/app/esm /home/node/app
WORKDIR /home/node/app

USER node

CMD ["node", "index.js"]
