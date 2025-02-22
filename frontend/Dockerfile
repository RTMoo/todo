# Используем стабильную LTS-версию Node.js
FROM node:lts-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости и очищаем кеш
RUN npm ci --prefer-offline --no-audit && npm cache clean --force

# Копируем остальной код
COPY . .

# Открываем порт (если необходимо)
EXPOSE 5173

# Запускаем dev-сервер
CMD ["npm", "run", "dev"]
