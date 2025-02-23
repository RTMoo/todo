import hashlib

from django.core.cache import cache

from tasks.models import Task


def filtration_data(request, query_dict):
    user = request.user.id
    is_completed = query_dict.get("is_completed", "null").lower()
    created_at = query_dict.get("created_at", "null").lower()

    filters = {"user": user}
    if is_completed in ("true", "false"):
        filters["is_completed"] = is_completed == "true"

    if created_at in ("asc", "desc"):
        ordering = "created_at" if created_at == "asc" else "-created_at"
        data = Task.objects.filter(**filters).order_by(ordering)
    else:
        data = Task.objects.filter(**filters)

    return data


def hashing(data):
    return hashlib.md5(str(data).encode()).hexdigest()


def cache_delete(user=None, pk=None):
    cache.delete_pattern(f"task_filter_{user}_*")
    if user:
        cache.delete(f"tasks_{user}")
        if pk:
            cache.delete(f"task_{user}_{pk}")
