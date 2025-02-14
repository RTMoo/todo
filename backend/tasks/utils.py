from tasks.models import Task


def filtration_data(request, query_dict):
    user = request.user
    is_completed = query_dict.get("is_completed", None)
    created_at = query_dict.get("created_at", None)

    is_completed = None if is_completed is None else is_completed.lower() == "true"
    created_at = (
        None
        if created_at is None
        else "-created_at"
        if created_at.casefold() == "desc"
        else "created_at"
    )

    filters = {"user": user}
    if is_completed is not None:
        filters["is_completed"] = is_completed

    data = Task.objects.filter(**filters)

    if created_at:
        data = data.order_by(created_at)

    return data if data.exists() else False
