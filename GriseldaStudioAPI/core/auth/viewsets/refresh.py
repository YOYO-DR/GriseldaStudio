from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework import viewsets
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken


class RefreshViewSet(viewsets.GenericViewSet, TokenRefreshView):
    #  cada cierto tiempo el front debe mandar el refresh para recibir un nuevo access, una vista valida eso, Entonces hace eso para tener un access valido para cada peticion cuando pide datos logueado
    permission_classes = (AllowAny,) # no necesita permisos para refrescar el token
    http_method_names = ["post"] # el metodo permitido sera post, ya que ejeuctara la funcion create

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data) # se obtiene el serializador con la data que se envio
        try:
            serializer.is_valid(raise_exception=True) # se valida el serializador
        except TokenError as e:
            raise InvalidToken(e.args[0]) # si hay un error se lanza una excepcion

        return Response(serializer.validated_data, status=status.HTTP_200_OK) # si todo esta bien se retorna la data validada y el status 200
