# Establecer la imagen base
FROM python:3.11

# Configura variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    nginx \
    certbot \
    python3-certbot-nginx \
    && rm -rf /var/lib/apt/lists/*

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de requerimientos al contenedor
COPY requirements.txt .

# Instalar las dependencias del proyecto
RUN pip install --no-cache-dir -r requirements.txt

# Asegurarse de que el usuario www-data exista
RUN id -u www-data &>/dev/null || useradd -r -s /bin/false www-data

# Instalar las dependencias requeridas para compilar la librería psycopg2 y nginx
RUN apt-get update && apt-get install -y libpq-dev nginx

# Copiar el código fuente al contenedor
COPY . .

# Copiar el archivo de configuración de nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copia el script de entrada

RUN chmod +x /app/compose/dokploy/web/docker-entrypoint.sh

ENV ENV_NAME=prod

# Exponer el puerto en el que se ejecuta el servidor de Django
EXPOSE 445

# Ejecuta el script de entrada
ENTRYPOINT ["/app/compose/dokploy/web/docker-entrypoint.sh"]
