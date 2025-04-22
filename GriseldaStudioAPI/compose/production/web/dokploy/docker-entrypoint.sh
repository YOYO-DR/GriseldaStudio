#!/bin/bash

# Eliminar la carpeta staticfiles si existe (para evitar nombres de hash antiguos)
if [ -d "/app/staticfiles" ]; then
    rm -rf /app/staticfiles/*
fi

# Aplicar migraciones y recopilar archivos estáticos
python manage.py migrate
python manage.py collectstatic --noinput

# Inicia Gunicorn para servir la aplicación Django
gunicorn --workers=4 --timeout=120 config.wsgi:application --bind 0.0.0.0:8000 &

# Inicia Nginx
service nginx start

# Espera hasta que Nginx esté completamente en funcionamiento
while ! curl -s http://localhost >/dev/null; do
    sleep 2
done

# Enviar correo de confirmación
python email_confir_prod.py

# Mantiene el contenedor en ejecución
tail -f /var/log/nginx/access.log