from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import ObjectDoesNotExist
import json

from .models import Drawing
from .save_image_response import SaveImageResponse
from .get_image_response import GetImageResponse


def draw_view_home(request, *args, **kwargs):
    return render(request, 'mirror_draw/mirror_draw_home.html', {})


def draw_view_mirror_draw(request, *args, **kwargs):
    # if draw_id is None or empty string, the variable does not get populated on the template
    draw_id = -1
    if request.GET:
        draw_id = request.GET.get('id', '')

    return render(request, 'mirror_draw/mirror_draw.html', {'draw_id': draw_id})


def draw_view_browse(request, *args, **kwargs):
    num_drawings = Drawing.objects.count()
    return render(request, 'mirror_draw/browse.html', {'num_drawings': num_drawings})


def draw_view_other(request, *args, **kwargs):
    return render(request, 'mirror_draw/other.html', {})


def draw_view_find_image(request, *args, **kwargs):
    return render(request, 'mirror_draw/find.html', {})


def draw_view_query_image(request, drawing_id, *args, **kwargs):
    if request.method == 'GET':
        try:
            drawing = Drawing.objects.get(id=drawing_id)
            return JsonResponse(GetImageResponse(drawing_id, True, data=drawing.string_image).as_dict())
        except ObjectDoesNotExist:
            return JsonResponse(
                GetImageResponse(drawing_id, False, reason='Drawing with such an ID does not exist').as_dict())
        except ValueError:
            return JsonResponse(GetImageResponse(drawing_id, False, reason='Drawing ID should be a number').as_dict())
        except:
            return JsonResponse(GetImageResponse(drawing_id, False, reason='Unknown error has occurred').as_dict())


def draw_view_save_image(request, *args, **kwargs):
    body = json.loads(request.body.decode('utf-8'))
    if request.method == 'POST':
        drawing = Drawing(string_image=body.get('data'))
        drawing.save()
        return JsonResponse(SaveImageResponse(drawing.id, True).as_dict())

    if request.method == 'PUT':
        try:
            draw_id = body.get('id')
            drawing = Drawing.objects.get(id=draw_id)
            drawing.string_image = body.get('data')
            drawing.save()
            return JsonResponse(SaveImageResponse(draw_id, True).as_dict())
        except ObjectDoesNotExist:
            return JsonResponse(SaveImageResponse(draw_id, False, 'Drawing with such an ID does not exist').as_dict())
        except ValueError:
            return JsonResponse(SaveImageResponse(draw_id, False, 'Drawing ID should be a number').as_dict())
        except:
            return JsonResponse(SaveImageResponse(draw_id, False, 'Unknown error has occurred').as_dict())
