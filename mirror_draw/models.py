from django.db import models


class Drawing(models.Model):
    string_image = models.TextField()