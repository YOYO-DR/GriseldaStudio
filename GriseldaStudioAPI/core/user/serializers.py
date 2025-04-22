from core.abstract.serializers import AbstractSerializer
from .models import User,UserProfile
from rest_framework import serializers

class UserProfileSerializer(AbstractSerializer):
    image= serializers.ImageField()
    class Meta:
        model = UserProfile
        fields = [
            "bio",
            "image",
        ]

class UserSerializer(AbstractSerializer): # heredo del serializador base
    profile = UserProfileSerializer(source="userprofile", read_only=True) # le pongo el source, porque sino, no sabe de donde sacar ese valor, y como la relacion es 1 a 1, el User queda con el atributo dle perfil, pero seria "userprofile", y el read_only=True es para que sera solo lectura por medio de este serializador
    class Meta:
        model = User
        fields = [
            "id", # no pondra el id normal autoincremental que tiene por defecto el modelo, sino el del serializador que heredo, en este caso es public_id
            "username",
            "first_name",
            "last_name",
            "profile",
            "email",
            "is_active",
            "created",
            "updated",
        ]

    read_only_field = ["is_active"]