FROM node:20.10-alpine

WORKDIR /app

ENV NODE_ENV=production
COPY ./package*.json ./

RUN npm install

COPY ./src ./

CMD [ "node","index.js" ]
