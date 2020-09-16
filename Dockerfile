FROM node:12.18-alpine

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3333

CMD ["./start-dev.sh"]
