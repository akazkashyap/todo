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

# Create a custom Nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
