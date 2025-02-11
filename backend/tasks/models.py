from django.db import models


class Task(models.Model):
    user = models.ForeignKey(
        to="accounts.CustomUser", on_delete=models.CASCADE, related_name="task_list"
    )
    title = models.CharField(max_length=128)
    description = models.TextField(max_length=512, blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Task id={self.pk} User={self.user.email}"