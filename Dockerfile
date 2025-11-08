FROM node:20.19.5

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Build production assets instead of running dev
RUN npm run build

# Use a lightweight web server to serve built files
FROM nginx:1.25
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]