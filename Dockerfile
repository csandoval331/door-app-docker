FROM node:16-alpine

RUN apk update
RUN apk upgrade
RUN apk add bash

WORKDIR /app

COPY src /app/src
COPY package.json /app
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]