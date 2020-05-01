FROM node:current-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build:prod

ENV PORT=8080 \
    HOST="https://team-product.fly.dev" \
    NODE_ENV=production

CMD [ "node", "dist/server.js" ]