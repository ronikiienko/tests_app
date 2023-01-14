# build environment
FROM node:16-slim
WORKDIR /project
COPY . .
RUN npm ci --only=production
RUN npm run build

FROM socialengine/nginx-spa:latest
COPY --from=0 /project/dist ./app
RUN chmod -R 777 ./app