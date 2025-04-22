#!/bin/bash

# Aplicar migraciones y recopilar archivos estáticos
python manage.py migrate
python manage.py collectstatic --no-input

# Inicia Gunicorn para servir la aplicación Django
python manage.py runserver 0.0.0.0:8000