from rest_framework import serializers

class AbstractSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField( # y id sera como se respondera al cliente
        source="public_id",  # el source es el campo del modelo que se utilizara para serializar, en este caso public_id
        read_only=True, # que sea de solo lectura
        format="hex", # formato hexadecimal
    )
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)