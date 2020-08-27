from django.shortcuts import render


def draw_view(request, *args, **kwargs):
    return render(request, 'mirror_draw/draw.html', {})
