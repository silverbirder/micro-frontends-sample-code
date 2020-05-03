FROM node:current-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

ENV PORT=8080 \
    TEAM_SEARCH_HOST="https://team-search.fly.dev" \
    TEAM_PRODUCT_HOST="https://team-product.fly.dev" \
    NODE_ENV=production

CMD [ "node","server.js" ]