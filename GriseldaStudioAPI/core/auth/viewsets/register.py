from rest_framework.viewsets import ViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from core.auth.serializers import RegisterSerializer

class RegisterViewSet(GenericViewSet): # clase para registrar un usuario
  serializer_class = RegisterSerializer # se define el serializador
  permission_classes = (AllowAny,) # no necesita permisos para registrarse
  http_method_names = ["post"] # el metodo permitido sera post, ya que ejeuctara la funcion create

  def create(self, request, *args, **kwargs): # funcion para registrar un usuario, se ejcuta cuando se envia un post
        serializer = self.serializer_class( # se obtiene el serializador con la data que se envio
            data=request.data
        )  # creo una instancia del serializer con los datos de la request
        serializer.is_valid(
            raise_exception=True
        )  # raise_exception=True para que si no es valido, devuelva un error
        user = serializer.save()  # guardo el usuario
        refresh = RefreshToken.for_user(user)  # creo un token de refresco
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        return Response(
            {  # devuelvo el usuario, el token de refresco y el token de acceso
                "user": serializer.data,
                **res # se desempaqueta el diccionario
            },
            status=status.HTTP_201_CREATED,
        )