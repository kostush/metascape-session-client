FROM node:16.16-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache openssh
RUN apk add --no-cache git
RUN apk add openjdk11
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh
COPY ../ssh/id_rsa /root/.ssh/id_rsa
#COPY ~/.ssh/id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts

COPY package*.json ./

RUN npm install

COPY .. .
