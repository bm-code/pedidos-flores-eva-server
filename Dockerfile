FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install -g npm@9.6.2

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
