from rest_framework.serializers import Serializer
from .models import Categoria
from core.abstract.serializers import AbstractSerializer

class CategoriaSerializer(AbstractSerializer):
  class Meta:
    model = Categoria
    fields = [
      "nombre",
      "slug",
      "descripcion",
      "id"
    ]