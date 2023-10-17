FROM node:lts-hydrogen as dev

WORKDIR /app
COPY . .


EXPOSE 3000

