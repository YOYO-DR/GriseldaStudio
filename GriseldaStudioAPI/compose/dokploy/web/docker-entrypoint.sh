#!/bin/bash

# Eliminar la carpeta staticfiles si existe (para evitar nombres de hash antiguos)
if [ -d "/app/staticfiles" ]; then
    rm -rf /app/staticfiles/*
fi

echo "Ejeutando migraciones y recopilando archivos estáticos..."
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput

echo "Iniciando Gunicorn..."
# Inicia Gunicorn en segundo plano para servir la app Django
gunicorn --workers=4 --timeout=120 config.wsgi:application --bind 0.0.0.0:8000 &

echo "Esperando a que Gunicorn esté en funcionamiento..."
while ! curl -s http://localhost:8000 >/dev/null; do
    sleep 2
    echo "Esperando a Gunicorn..."
done

echo "Gunicorn está en funcionamiento."

echo "Iniciando Nginx..."
# Nginx en modo foreground (no daemon)
nginx -g "daemon off;" &

echo "Esperando a que Nginx esté completamente en funcionamiento..."
while ! curl -s http://localhost:443 >/dev/null; do
    sleep 2
    echo "Esperando a que Nginx esté completamente en funcionamiento..."
done

echo "Nginx está en funcionamiento."

# Mantener el contenedor vivo viendo logs de nginx
tail -f /var/log/nginx/access.log
