FROM node:23-slim

# Install Python, build essentials for native modules, and libsecret runtime library
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libsecret-1-dev \
    libsecret-1-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including dev) and rebuild native modules
RUN npm ci && npm rebuild

COPY . .

CMD ["npm", "start"] 