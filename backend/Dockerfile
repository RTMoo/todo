# Используем лёгкий образ
FROM python:3.12-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY ../requirements.txt .

# Обновляем pip и устанавливаем зависимости
RUN pip install --upgrade pip && pip install -r requirements.txt

# Копируем весь код проекта
COPY . .

# Указываем переменную окружения для SQLite или PostgreSQL
ENV DATABASE_URL=sqlite:///db.sqlite3

# Открываем порт для Django
EXPOSE 8000

# Запускаем сервер
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]