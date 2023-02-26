FROM node:19.7.0-alpine3.16

WORKDIR /root

COPY package.json /root

RUN yarn

COPY . /root

CMD ["node", "index.js"]
