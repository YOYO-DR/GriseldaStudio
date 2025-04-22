#!/bin/bash

# Aplicar migraciones y recopilar archivos estáticos
python manage.py migrate
python manage.py collectstatic --no-input

# Esperar que postgres esté disponible
while ! nc -z db 5432; do
  echo "Esperando a que PostgreSQL esté disponible..."
  sleep 1
done

# Inicia Gunicorn para servir la aplicación Django
python manage.py runserver 0.0.0.0:8000