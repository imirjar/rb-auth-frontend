# Используем официальный Node.js образ для сборки
FROM node:22-alpine AS builder

WORKDIR /app

# Копируем зависимости и собираем проект
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Используем легкий образ для production
FROM node:22-alpine AS runner

WORKDIR /app

# Копируем только нужные файлы
COPY --from=builder /app/.output ./
COPY --from=builder /app/node_modules ./node_modules

# Указываем переменные среды (если нужно переопределить API_URL)
# ENV NUXT_PUBLIC_API_BASE_URL=${AUTH_API:-http://auth.redbeaver.ru}

# Открываем порт и запускаем сервер
EXPOSE 3000
CMD ["node", "/app/server/index.mjs"]