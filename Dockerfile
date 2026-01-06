FROM node:23-slim

# Install Python and build essentials for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libsecret-1-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including dev) and rebuild native modules
RUN npm ci && npm rebuild

COPY . .

CMD ["npm", "start"] 