FROM node:14-alpine as development

WORKDIR /usr/src/app

RUN apk update && apk upgrade
RUN apk add --update yarn openssh-client git

RUN mkdir /root/.ssh/
ADD id_rsa /root/.ssh/id_rsa
RUN chmod 400 /root/.ssh/id_rsa
RUN cat /root/.ssh/id_rsa

RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --only=production

COPY . .

RUN yarn build
CMD [ "yarn", "start:prod" ]