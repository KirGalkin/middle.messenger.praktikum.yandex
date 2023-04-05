FROM node:16.14.2-alpine

WORKDIR /app/chat

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3100

CMD ["node", "./server.js"]
