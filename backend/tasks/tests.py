from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken
from accounts.models import CustomUser
from tasks.models import Task


class TestTask(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email="b@a.com", password="12345678")
        self.token = str(AccessToken.for_user(self.user))
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_create_task(self):
        data = {
            "title": "Купить хлеб",
            "description": "Не забыть сдачу",
            "is_completed": False,
        }
        response = self.client.post("/api/tasks/", data)
        self.assertEqual(response.status_code, 201)

        task = Task.objects.first()
        self.assertIsNotNone(task)
        self.assertEqual(task.user, self.user)

        response_data = response.json()
        self.assertEqual(response_data["title"], data["title"])
        self.assertEqual(response_data["description"], data["description"])
        self.assertEqual(response_data["is_completed"], data["is_completed"])
