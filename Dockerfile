#temp various becouse use build and apache need set rewrite mode for it. 
FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]