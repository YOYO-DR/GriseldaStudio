from core.abstract.models import AbstractModel
from django.db import models

class Categoria(AbstractModel):
    nombre=models.CharField(max_length=200, unique=True, verbose_name='Nombre',null=False, blank=False)
    slug=models.CharField(max_length=200, unique=True, verbose_name='Slug', null=True, blank=True)
    descripcion=models.TextField(max_length=500,null=True, blank=True, verbose_name='Descripción')

    def __str__(self):
        return self.nombre