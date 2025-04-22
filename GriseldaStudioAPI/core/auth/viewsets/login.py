
from rest_framework.viewsets import ViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin
from core.auth.serializers import LoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

class LoginViewSet(GenericViewSet): # creo el viewset para el login
  serializer_class = LoginSerializer # le paso su serializador
  permission_classes=(AllowAny,) # le paso los permisos
  http_method_names = ['post'] # le paso los métodos http que va a aceptar

  # no le pongo un action, porque en "create" va por el post, por defecto leera el create para el post
  def create(self, request): # creo la función create, cuando se va a crear un inicio de sesión
    serializer=self.serializer_class(data=request.data) # creo el serializador segun los datos
    try:
      serializer.is_valid(raise_exception=True) # valido el serializador
    except TokenError as e:
      raise InvalidToken(e.args[0]) # si hay un error de token, lo muestro
    return Response(serializer.validated_data, status=status.HTTP_200_OK) # devuelvo los datos validados y el estado de la petición 