from accounts.models import CustomUser
from rest_framework import serializers

from tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Task
        fields = ["id", "user", "title", "description", "is_completed", "created_at"]
        read_only_fields = ["id", "user", "created_at"]

    def create(self, validated_data):
        user_id = self.context["request"].user.id
        validated_data["user"] = CustomUser.objects.only("id").get(pk=user_id)
        return super().create(validated_data)
