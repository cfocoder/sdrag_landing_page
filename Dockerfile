# Use Nginx to serve static files
FROM nginx:alpine

# Copy all files to Nginx html directory
COPY . /usr/share/nginx/html/

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
