import json

from accounts.models import CustomUser
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from tasks.models import Task


class TestTask(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email="b@a.com", password="12345678")
        self.token = str(AccessToken.for_user(self.user))
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.data = {
            "title": "Заголовок",
            "description": "Описание",
            "is_completed": False,
        }

    def create_task(self):
        response = self.client.post(path="/api/tasks/", data=self.data)
        return response

    def test_post(self):
        response = self.create_task()
        response_data = response.json()
        task = Task.objects.get(pk=response_data["id"])

        self.assertEqual(response.status_code, 201)
        self.assertIsNotNone(task)
        self.assertEqual(task.user, self.user)
        self.assertEqual(task.title, self.data["title"])
        self.assertEqual(task.description, self.data["description"])
        self.assertEqual(task.is_completed, self.data["is_completed"])

    def test_patch(self):
        response = self.create_task()
        task_id = response.json()["id"]

        partial_update_data = {
            "description": "Описание после изменения",
            "is_completed": True,
        }

        response = self.client.patch(
            path=f"/api/tasks/{task_id}/",
            data=json.dumps(partial_update_data),
            content_type="application/json",
        )

        task = Task.objects.get(pk=task_id)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(task.description, partial_update_data["description"])
        self.assertEqual(task.is_completed, partial_update_data["is_completed"])

    def test_delete(self):
        response = self.create_task()
        task_id = response.json()["id"]

        response = self.client.delete(
            path=f"/api/tasks/{task_id}/",
        )

        is_deleted = Task.objects.filter(pk=task_id).exists()

        self.assertEqual(response.status_code, 204)
        self.assertEqual(is_deleted, False)
