from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .filter_set import CategoriaFilter

from .serializers import CategoriaSerializer
from .models import Categoria


class CategoriaViewSet(GenericViewSet, ListModelMixin,RetrieveModelMixin):
  serializer_class = CategoriaSerializer # Clase serializadora
  queryset = Categoria.objects.all() # Consulta a la base de datos

  filter_backends = [DjangoFilterBackend, # Filtros
                     filters.SearchFilter, filters.OrderingFilter]
  
  filterset_class = CategoriaFilter # Clase de filtros personalizada
  
  filterset_fields = ['nombre', 'slug']  # Campos por los que deseas filtrar
  search_fields = ['nombre', 'descripcion'] # Campos por los que deseas realizar búsquedas
  ordering_fields = ['nombre', 'slug']  # Campos por los que deseas ordenar
  lookup_field = 'public_id' 
