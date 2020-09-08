from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import ObjectDoesNotExist
from .models import Drawing
from .save_image_response import SaveImageResponse
import json


def draw_view_home(request, *args, **kwargs):
    return render(request, 'mirror_draw/mirror_draw_home.html', {})


def draw_view_mirror_draw(request, *args, **kwargs):
    return render(request, 'mirror_draw/mirror_draw.html', {})


def draw_view_other(request, *args, **kwargs):
    return render(request, 'mirror_draw/other.html', {})


def draw_view_save_image(request, *args, **kwargs):
    body = json.loads(request.body.decode('utf-8'))
    if request.method == 'POST':
        drawing = Drawing(string_image=body.get('data'))
        drawing.save()
        return JsonResponse(SaveImageResponse(drawing.id, True, 'POST').as_dict())

    if request.method == 'PUT':
        try:
            draw_id = body.get('id')
            drawing = Drawing.objects.get(id=draw_id)
            drawing.string_image = body.get('data')
            drawing.save()
            return JsonResponse(SaveImageResponse(draw_id, True, 'PUT').as_dict())
        except ObjectDoesNotExist:
            return JsonResponse(SaveImageResponse(draw_id, False, 'Drawing with such an ID does not exist').as_dict())
        except ValueError:
            return JsonResponse(SaveImageResponse(draw_id, False, 'Drawing ID should be a number').as_dict())
        except:
            return JsonResponse(SaveImageResponse(draw_id, False, 'Unknown error has occurred').as_dict())
