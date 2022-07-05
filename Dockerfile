
# Stage 1, Build the code
FROM node:16-alpine as builder
WORKDIR /app

# Important, copy lerna.json
COPY package.json lerna.json ./
COPY packages/server/package.json /app/packages/server/package.json
COPY packages/commons/package.json /app/packages/commons/package.json
COPY packages/web/package.json /app/packages/web/package.json

RUN yarn install

COPY . ./

# Scoped is defined in the root package.json build command.
RUN yarn build

# Stage 2, Build the image
FROM node:16-alpine
WORKDIR /app

# Important, copy lerna.json
COPY --from=builder /app/package.json /app/lerna.json ./
COPY --from=builder /app/yarn.lock ./

COPY --from=builder /app/packages/server/package.json ./packages/server/package.json
COPY --from=builder /app/packages/commons/package.json ./packages/commons/package.json
COPY --from=builder /app/packages/web/package.json ./packages/web/package.json

COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/commons/dist ./packages/commons/dist
COPY --from=builder /app/packages/web/build ./packages/web/build

# Copy the environment variables
COPY ./packages/server/.env ./packages/server/.env

# Copy these files to use typescript path mappings on production
COPY ./packages/server/prod-paths.js ./packages/server/prod-paths.js
COPY ./packages/server/tsconfig.json ./packages/server/tsconfig.json

RUN yarn install

WORKDIR /app/packages/server

EXPOSE 3000
CMD node -r ./prod-paths.js ./dist/server.js