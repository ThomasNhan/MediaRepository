# build imnage
FROM node:14.0.0-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build


# base image
FROM nginx:1.18.0-alpine
COPY --from=node /usr/src/app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
