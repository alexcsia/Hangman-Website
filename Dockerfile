# Stage 1: Build the Next.js frontend
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json ./
COPY package-lock.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the entire source code
COPY . .

# Build the frontend (Next.js)
RUN npm run build

# Stage 2: Create a production-ready image
FROM node:18-alpine

# Set working directory for production
WORKDIR /app

# Copy only the built code and necessary dependencies from the previous stage
COPY --from=build /app /app

# Set environment to production
ENV NODE_ENV=production

# Expose the port your app will run on
EXPOSE 3000

# Start the backend 
CMD ["npm", "start"]
