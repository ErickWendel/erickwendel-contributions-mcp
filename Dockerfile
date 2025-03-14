FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

CMD ["node", "src/index.ts"] 