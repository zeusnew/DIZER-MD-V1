
# Update and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    webp && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and install dependencies
COPY package.json .

RUN npm install && npm install -g qrcode-terminal

# Copy the entire project
COPY . .

# Expose the port
EXPOSE 5000

# Command to run the application
CMD ["node", "src/index.js"]
