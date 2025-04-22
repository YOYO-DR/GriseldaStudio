from rest_framework_nested import routers

from .producto.viewsets import ProductoViewSet

from .categoria.viewsets import CategoriaViewSet
from .auth.viewsets import RegisterViewSet, RefreshViewSet
from .user.views import UserListView
from .auth.viewsets import LoginViewSet
router=routers.SimpleRouter()

# Auth
router.register(r'auth/register',RegisterViewSet,basename='register')
router.register(r'auth/refresh', RefreshViewSet, basename='refresh')
router.register(r'auth/login',LoginViewSet,basename="login")

# Categorias 
router.register(r'categorias',CategoriaViewSet,basename='categorias')

# Productos
router.register(r'productos',ProductoViewSet,basename='productos')
urlpatterns = [
    *router.urls,
]
