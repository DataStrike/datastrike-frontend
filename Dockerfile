FROM node:alpine as build
WORKDIR /app
COPY . .
RUN yarn install 
RUN yarn build --base=./

# production environment
FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]