FROM node:12.18.1-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]