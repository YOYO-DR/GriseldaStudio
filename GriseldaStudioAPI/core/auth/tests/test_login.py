import pytest
from rest_framework import status
from core.fixtures.user import user,data_user

class TestAuthenticationViewSet:
  endpoint = '/api/auth/'

  # Prueba de inicio de sesión
  def test_login(self,client,user):
    response = client.post(self.endpoint + 'login/',{
      'email': user.email,
      'password': data_user['password']
    })

    assert response.status_code == status.HTTP_200_OK
    assert response.data.get('refresh')
    assert response.data.get('access')
    assert response.data.get('user')
    
    # validar todos los datos retornados del usuario, esten en el usuario
    if response.data.get("user"):
      user_keys = user.__dict__.keys()
      for clave, valor in response.data.get('user').items():
        if clave != 'profile':
          assert clave in user_keys
  # Prueba de inicio de sesión invalido
  @pytest.mark.django_db
  def test_login_invalid(self,client):
    response = client.post(self.endpoint + 'login/',{
      'email': 'prueba@gmail.com',
      "password":"prueba3214"
    })
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.data.get('detail') == 'No active account found with the given credentials'

  # Prueba de registro de usuario
  @pytest.mark.django_db
  def test_register(self,client):
    data={
      'username':'prueba',
      'email':'prueba@gmail.com',
      'first_name':'prueba',
      'last_name':'prueba',
      'password':'prueba123'
    }
    response = client.post(self.endpoint+ 'register/',data)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data.get('refresh')
    assert response.data.get('access')
    for clave, valor in data.items(): # validar los datos enviados con los recibidos
      if clave != 'password':
        assert response.data.get('user').get(clave) == data[clave]
  
  # Prueba de registro de usuario ya creado
  def test_register_created(self,client,user):
    response = client.post(self.endpoint + 'register/',{
      'username':user.username,
      'email':user.email,
      'first_name':user.first_name,
      'last_name':user.last_name,
      'password':data_user['password']
    })

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data.get('email') == ['user with this email already exists.']
    assert response.data.get('username') == ['user with this username already exists.']
  
  # Prueba de actualización de token de acceso
  def test_refresh(self,client,user):
    response = client.post(self.endpoint+'login/',{
      'email':user.email,
      'password':data_user['password']
    })
    assert response.status_code == status.HTTP_200_OK
    assert response.data.get('refresh')
    assert response.data.get('access')
    
    refresh = response.data.get('refresh')
    
    response = client.post(self.endpoint+'refresh/',{
      'refresh':refresh
    })

    assert response.status_code == status.HTTP_200_OK
    assert response.data.get('access')

  
