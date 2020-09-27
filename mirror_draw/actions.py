from .models import Drawing


def delete(draw_id):
    to_del = Drawing.objects.get(id=draw_id)
    to_del.string_image = Drawing.objects.get(id=1).string_image
    to_del.save()
