FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
# Copy the rest of the application code

COPY . .


# Expose port 8008
EXPOSE 8000

# Start the application in development mode
CMD ["pnpm", "dev"]