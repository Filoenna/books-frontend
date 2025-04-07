FROM node:lts-alpine AS build

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install 
RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]