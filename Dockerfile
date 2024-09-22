# Use the official Node.js image as a base
FROM node:18.20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the Vue.js development server runs on
EXPOSE 8080

# Command to run the application in development mode
CMD ["npm", "run", "serve"]