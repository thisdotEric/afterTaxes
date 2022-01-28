FROM node:16 as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=builder /app/dist ./dist

ENV NODE_ENV production

EXPOSE 3000
CMD yarn start