# ToDo

Простое todo для управления задачами.

## Стек технологий

- **Backend**: Django, Django REST Framework (DRF), Django Simple JWT
- **Frontend**: React, React Router DOM
- **База данных**: SQLite3
- **Аутентификация**: JWT

## Функционал

- Регистрация и авторизация пользователей
- Создание, редактирование и удаление задач
- Фильтрация задач по статусу (`is_completed`)
- Сортировка задач по дате (`created_at`)
- Интерактивный UI с React

## Установка

### Backend

1. Установите зависимости:

   ```bash
   pip install -r requirements.txt
   ```

2. Примените миграции:

   ```bash
   python manage.py migrate
   ```

3. Создайте суперпользователя:

   ```bash
   python manage.py createsuperuser
   ```

4. Запустите сервер:

   ```bash
   python manage.py runserver
   ```

### Frontend

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Запустите приложение:

   ```bash
   npm run dev
   ```

## API

Основные эндпоинты:

- `POST /api/accounts/login/` – вход
- `POST /api/accounts/logout/` – выход
- `POST /api/accounts/register/` – регистрация
- `GET /api/tasks/` – список задач
- `POST /api/tasks/` – создать задачу
- `PATCH /api/tasks/{id}/` – обновить задачу
- `DELETE /api/tasks/{id}/` – удалить задачу

## Фильтрация и сортировка

Пример запроса:

```
GET /api/tasks/?is_completed=true&created_at=desc
```

## Автор

Разработчик: **[RTMoo]**  
