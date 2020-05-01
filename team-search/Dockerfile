FROM node:12-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build:prod

ENV PORT=8080 \
    HOST="https://team-search.fly.dev" \
    PRODUCT_HOST="https://team-product.fly.dev" \
    NODE_ENV=production

CMD [ "node","app.js"]