import os
from core.abstract.models import AbstractModel
from django.db import models
from django.urls import reverse
from config.settings import MEDIA_URL
from core.categoria.models import Categoria

# Create your models here.
class Producto(AbstractModel):
    nombre=models.CharField(max_length=200, unique=True, verbose_name='Nombre',null=False, blank=False)
    slug=models.CharField(max_length=200, db_index=True,unique=True, verbose_name='Slug',null=True, blank=True)
    descripcion=models.TextField(max_length=500, null=False, blank=False, verbose_name='Descripción')
    precio=models.DecimalField(max_digits=10,decimal_places=2,verbose_name='Precio',null=False, blank=False)
    precio_oferta=models.DecimalField(max_digits=10,decimal_places=2,default=0.00, verbose_name='Precio de oferta')
    imagen = models.ImageField(upload_to=f"{MEDIA_URL if 'WEBSITE_HOSTNAME' in os.environ else ''}img/productos/",verbose_name='Imagen',null=True, blank=True)
    stock=models.IntegerField(verbose_name='Stock',default=0)
    estado=models.BooleanField(default=True, verbose_name='Estado')
    categoria=models.ForeignKey(Categoria,on_delete=models.CASCADE, verbose_name='Categoría',null=False, blank=False)

    def save(self, *args, **kwargs):
      self.slug = self.nombre.lower().replace(" ", "-")
      return super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre