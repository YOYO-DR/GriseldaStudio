# Establecer la imagen base
FROM python:3.11

# Configura variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de requerimientos al contenedor
COPY requirements.txt .

# Instalar las dependencias del proyecto
RUN pip install --no-cache-dir -r requirements.txt


# Instalar las dependencias requeridas para compilar la librería psycopg2 y nginx
RUN apt-get update && apt-get install -y libpq-dev

# Copiar el código fuente al contenedor
COPY . .

# Dar permiso al archivo de entrada
RUN chmod +x /app/compose/local/web/docker-entrypoint.sh

ENV ENV_NAME=local

# Exponer el puerto en el que se ejecuta el servidor de Django
EXPOSE 8000

# Ejecuta el script de entrada
ENTRYPOINT ["/app/compose/local/web/docker-entrypoint.sh"]
