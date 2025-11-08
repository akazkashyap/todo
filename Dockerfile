# ----------------------------
# Stage 1: Build the Vite app
# ----------------------------
FROM node:20.19.5 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# ----------------------------
# Stage 2: Serve with Nginx
# ----------------------------
FROM nginx:1.25

# Copy built files to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default nginx.conf to use port 8000
RUN sed -i 's/listen       80;/listen 8000;/' /etc/nginx/conf.d/default.conf

# Expose port 8000
EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
