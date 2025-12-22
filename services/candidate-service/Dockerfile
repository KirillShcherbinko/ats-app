FROM node:22-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости внутри контейнера (Linux)
RUN npm ci

# Копируем остальные файлы
COPY . .

# Проброс порта
EXPOSE 50061

# Старт
CMD ["sh", "-c", "npx drizzle-kit push --config=./drizzle.config.ts && npm run dev"]
