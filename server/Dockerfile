#Grab the node container from docker hub
FROM node:14.0.0-alpine

#Create our working directory.  This will be where our files go
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN apk add --no-cache make gcc g++ python && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python

#Copy our source files to the container
COPY ./ . 

EXPOSE 3333

CMD ["node", "bin/www"]