FROM node:20.18-alpine3.20

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json to the container.
COPY package*.json ./

# Install project dependencies using 'npm ci' to ensure a consistent environment.
RUN npm ci

# Copy the rest of your application code into the container.
COPY . .

# Define the default command to run when the container starts.
CMD ["npm", "test"]
