import django_filters
from .models import Categoria

class CategoriaFilter(django_filters.FilterSet):
    class Meta:
        model = Categoria
        fields = {
            'nombre': ['exact', 'icontains'],  # Filtrado exacto y por contención
            'slug': ['exact'],
        }
