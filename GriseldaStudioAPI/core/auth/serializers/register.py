from rest_framework import serializers
from core.user.serializers import UserSerializer
from core.user.models import User

class RegisterSerializer(UserSerializer):
    # La contraseña debe tener al menos 8 caracteres
    password = serializers.CharField(
        max_length=128, min_length=8, write_only=True, required=True
    )

    class Meta:
        model = User
        # List de campos que se van a serializar
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "password",
        ]

    def create(self, validated_data):  # se llama cuando se ejecuta en .save()
        return User.objects.create_user(**validated_data)