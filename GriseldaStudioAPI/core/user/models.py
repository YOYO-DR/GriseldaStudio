from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
import os
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.http import Http404
from config.settings import MEDIA_URL, STATIC_URL #, STATIC_URL_AZURE
from core.abstract.models import AbstractModel, AbstractManager

class UserManager(BaseUserManager, AbstractManager):
  def get_object_by_public_id(self,public_id):
    try:
      instance = self.get(public_id=public_id)
      return instance
    except (ObjectDoesNotExist, ValueError, TypeError):
      return Http404
  pass

  def create_user(self, username, email, password=None, **kwargs):  
        # crear un usuario con un email, número de teléfono, nombre de usuario y contraseña
        """Create and return a `User` with an email, phone number, username and password."""
        if username is None:
            raise TypeError("Users must have a username.")
        if email is None:
            raise TypeError("User must have an email.")
        if password is None:
            raise TypeError("User must have a password.")

        # el nomrmalize_email pone el dominio en minusculas
        user = self.model( # self.model hace referencia al modelo de usuario, y se le pasan los datos
            username=username, email=self.normalize_email(email), **kwargs
        )
        user.set_password(password) # se encripta la contraseña
        user.save(using=self._db)

        return user
  
  def create_superuser(
        self, username, email, password, **kwargs
    ):  # crear un superusuario con un email, número de teléfono, nombre de usuario y contraseña
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError("Superusers must have a password.")
        if email is None:
            raise TypeError("Superusers must have an email.")
        if username is None:
            raise TypeError("Superusers must have an username.")

        user = self.create_user(username=username, email=self.normalize_email(email), password=password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
  username = models.CharField(db_index=True, max_length=255, unique=True)
  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255)

  email = models.EmailField(db_index=True, unique=True)
  is_active = models.BooleanField(default=True)
  is_superuser = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)

  USERNAME_FIELD = "email"  # campo que se utilizara para el login, la cua es unico
  REQUIRED_FIELDS = ["username"]

  objects = UserManager()

  def __str__(self):
    return f"{self.email}"
  
  @property
  def name(self):
    return f"{self.first_name} {self.last_name}"

class UserProfile(AbstractModel):
  bio = models.TextField(null=True)  # biografia
  image = models.ImageField(upload_to=f"{MEDIA_URL if 'WEBSITE_HOSTNAME' in os.environ else ''}user/%Y/%m/",null=True,blank=True, verbose_name='Image')
  
  user = models.OneToOneField(User, on_delete=models.CASCADE)  # relacion uno a uno con el modelo User

  @property
  def image_url(self):
    if self.imagen:
      return self.imagen.url
    return f"{STATIC_URL}/img/user_empty.png"
  
  def __str__(self):
    return f"{self.user.username} Profile"