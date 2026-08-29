FROM nginx:alpine

# Copy all static website files to Nginx html directory
COPY . /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
