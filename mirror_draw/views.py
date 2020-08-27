from django.shortcuts import render


def draw_view_home(request, *args, **kwargs):
    return render(request, 'mirror_draw/mirror_draw_home.html', {})
