"""draw URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from mirror_draw.views import (draw_view_home,
                               draw_view_mirror_draw,
                               draw_view_save_image,
                               draw_view_find_image,
                               draw_view_other)

urlpatterns = [
    path('', draw_view_home),
    path('mirror_draw/', draw_view_mirror_draw),
    path('mirror_draw/save', draw_view_save_image),
    path('find', draw_view_find_image),
    path('other/', draw_view_other),
]
