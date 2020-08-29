from django.shortcuts import render


def draw_view_home(request, *args, **kwargs):
    return render(request, 'mirror_draw/mirror_draw_home.html', {})


def draw_view_mirror_draw(request, *args, **kwargs):
    return render(request, 'mirror_draw/mirror_draw.html', {})


def draw_view_other(request, *args, **kwargs):
    return render(request, 'mirror_draw/other.html', {})
