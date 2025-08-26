FROM node:23.11.0-alpine as BUILD_IMAGE

WORKDIR /app/react-app

COPY package.json .
RUN npm i

COPY . .


RUN npm run build


FROM nginx:1.25-alpine as PRODUCTION_IMAGE

COPY --from=BUILD_IMAGE /app/react-app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
