FROM node:20.16.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY  ${SOURCE_APP_DIR}/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY  ${SOURCE_APP_DIR} /app/



ARG ROOT_PATH   
ENV PUBLIC_URL=${ROOT_PATH}    
# Build the React app  
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

COPY ${SOURCE_APP_DIR}/default.conf   /etc/nginx/conf.d/default.conf
COPY ${SOURCE_APP_DIR}/entrypoint.sh /entrypoint.sh

RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh


RUN chmod +x /entrypoint.sh

# Expose port 8000
EXPOSE 8000


# Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

ENTRYPOINT ["/entrypoint.sh"]