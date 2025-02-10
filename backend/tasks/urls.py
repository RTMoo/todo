from django.urls import path
from tasks import views

urlpatterns = [
    path("", view=views.TaskAPIView.as_view(), name="list-create_task"),
    path("task/<int:pk>/", view=views.TaskAPIView.as_view(), name="get-update-delete_task"),
]