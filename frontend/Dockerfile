FROM node:14.18.1 as build

ENV NODE_ENV=production

WORKDIR /src/app

COPY package*.json yarn*.lock ./

RUN yarn install --production && yarn cache clean --force

COPY . .

RUN yarn run build

FROM nginx:1.20.1

COPY --from=build /src/app/build/ /usr/share/nginx/html

COPY --from=build /src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80