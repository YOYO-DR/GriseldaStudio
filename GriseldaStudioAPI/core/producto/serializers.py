from rest_framework import serializers
from core.abstract.serializers import AbstractSerializer
from core.categoria.serializers import CategoriaSerializer
from .models import Producto

class ProductoSerializer(AbstractSerializer):
  imagen = serializers.ImageField()
  categoria = CategoriaSerializer()

  class Meta:
    model = Producto
    fields = [
      "id",
      "nombre",
      "slug",
      "descripcion",
      "stock",
      "precio",
      "precio_oferta",
      "imagen",
      "categoria"
    ]