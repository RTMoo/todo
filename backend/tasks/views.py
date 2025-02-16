from django.core.exceptions import FieldDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from tasks.models import Task
from tasks.serializers import TaskSerializer
from tasks.utils import filtration_data


class TaskAPIView(APIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        query_dict = request.GET
        user = request.user.id

        if pk is not None:
            task = get_object_or_404(Task, pk=pk, user=user)
            serializer = self.serializer_class(instance=task)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        elif query_dict:
            data = filtration_data(request=request, query_dict=query_dict)
            if data:
                serializer = self.serializer_class(instance=data, many=True)
                return Response(data=serializer.data, status=status.HTTP_200_OK)

            return Response(status=status.HTTP_204_NO_CONTENT)

        tasks = Task.objects.filter(user=request.user.id)
        serializer = self.serializer_class(tasks, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = request.user.id

        deleted_count, _ = Task.objects.filter(pk=pk, user=user).delete()

        if deleted_count == 0:
            return Response(
                {"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {"message": "Task deleted successfully"}, status=status.HTTP_204_NO_CONTENT
        )

    def patch(self, request, pk):
        user_id = request.user.id

        try:
            updated_rows = Task.objects.filter(pk=pk, user_id=user_id).update(
                **request.data
            )

            if updated_rows == 0:
                return Response(
                    {"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND
                )

            return Response(
                {"message": "Task updated successfully"}, status=status.HTTP_200_OK
            )

        except FieldDoesNotExist:
            return Response(
                {"message": "Don't valide fields"}, status=status.HTTP_200_OK
            )
