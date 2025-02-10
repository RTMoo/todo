from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from tasks.serializers import TaskSerializer
from tasks.models import Task
from django.shortcuts import get_object_or_404


class TaskAPIView(APIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk is not None:
            task = get_object_or_404(Task, pk=pk)
            return Response(data=task, status=status.HTTP_200_OK)

        tasks = Task.objects.all()
        serializer = self.serializer_class(tasks, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        task.delete()
        return Response(
            {"message": f"Product id={pk} deleted"},
            status=status.HTTP_204_NO_CONTENT,
        )

    def patch(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        serializer = self.serializer_class(task, request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
