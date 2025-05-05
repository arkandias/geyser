FROM node:22-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# The build artifacts will go to /app/dist
