FROM node:22-alpine

WORKDIR /app

RUN mkdir -p /app/proto

# Копируем только package.json для кэширования
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем остальные файлы
COPY . .

EXPOSE 5000

# Запускаем сервер
CMD ["npm", "run", "dev"]
