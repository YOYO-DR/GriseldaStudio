from time import sleep
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .filter_set import ProductoFilter

from .models import Producto

from .serializers import ProductoSerializer

from rest_framework.permissions import AllowAny

class ProductoViewSet(GenericViewSet,ListModelMixin, RetrieveModelMixin):
  permission_classes = (AllowAny,)
  serializer_class = ProductoSerializer
  lookup_field = 'slug'
  queryset = Producto.objects.all()

  filter_backends = [DjangoFilterBackend, # Filtros
                    filters.SearchFilter, filters.OrderingFilter]
  
  filterset_class = ProductoFilter # Clase de filtros personalizada
  
  filterset_fields = ['nombre']  # Campos por los que deseas filtrar
  search_fields = ['nombre', 'descripcion'] # Campos por los que deseas realizar búsquedas
  ordering_fields = ['nombre', 'slug']  # Campos por los que deseas ordenar