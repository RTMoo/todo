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
