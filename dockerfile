# Use the official Node.js image as the base image
FROM node:20.3.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "dist/src/index.js"]
