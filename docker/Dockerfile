FROM mcr.microsoft.com/playwright:v1.61.1

WORKDIR /app

#  First copy package file- for docker layer caching
COPY package*.json ./
RUN npm ci

# Copy the remaining project
COPY . .

# Default command to run all test 
CMD ["npx", "playwright", "test", "--project=chromium", "--project=firefox"]