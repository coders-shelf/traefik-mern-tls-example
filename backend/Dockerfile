FROM node:14.18.1

ENV NODE_ENV=production

WORKDIR /src/node/app

COPY package*.json yarn*.lock ./

RUN yarn install --production && yarn cache clean --force

COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www" ]
