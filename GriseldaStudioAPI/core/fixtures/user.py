import pytest
from core.user.models import User

data_user = {
  "email":"prueba@gmail.com",
  "username":"prueba",
  "password":"prueba321",
  "first_name":"Prueba",
  "last_name":"Test"
}

@pytest.fixture
def user(db) -> User:
  return User.objects.create_user(**data_user)