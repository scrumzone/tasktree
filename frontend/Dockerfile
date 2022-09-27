FROM node:16.17 as development

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

CMD ["npm", "run", "start"]