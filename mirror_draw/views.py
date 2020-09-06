from django.shortcuts import render
from django.http import JsonResponse


def draw_view_home(request, *args, **kwargs):
    return render(request, 'mirror_draw/mirror_draw_home.html', {})


def draw_view_mirror_draw(request, *args, **kwargs):
    return render(request, 'mirror_draw/mirror_draw.html', {})


def draw_view_other(request, *args, **kwargs):
    return render(request, 'mirror_draw/other.html', {})


def draw_view_save_image(request, *args, **kwargs):
    print(f'Received {request}')
    print(request.body)
    r = {
        'id': '132',
        'success': 'true'
    }

    return JsonResponse(r)
