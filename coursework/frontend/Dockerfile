FROM node:latest

LABEL maintainer="belov@gmail.com"

COPY . /app

WORKDIR /app

RUN npm i

EXPOSE 3000

COPY ./docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]