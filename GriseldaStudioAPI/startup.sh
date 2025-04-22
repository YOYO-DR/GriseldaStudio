#para ejecutar en el azure en el despliegue
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input