FROM mhart/alpine-node:11 AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn run build

FROM nginx:1.12-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
