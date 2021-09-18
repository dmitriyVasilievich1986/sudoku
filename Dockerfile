FROM node:12.18.1

LABEL author="dmitriyvasil@gmail.com"

ENV HOST=0.0.0.0
ENV PORT=8000

RUN mkdir /app
WORKDIR /app

COPY template /app/template
COPY static /app/static

COPY ./package-lock.json /app
COPY ./package.json /app
COPY ./server.js /app
COPY ./.env /app

RUN npm install

CMD node server.js