FROM mcr.microsoft.com/playwright:v1.61.1

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test", "--project=chromium", "--project=firefox"]