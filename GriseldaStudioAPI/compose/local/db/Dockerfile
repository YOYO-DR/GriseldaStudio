# Usamos la imagen oficial de PostgreSQL
FROM postgres:16

# Exponer el puerto 5432 para conexiones externas
EXPOSE 5432

# Copia los archivos de configuración personalizados al contenedor
COPY ./compose/local/db/postgresql.conf /etc/postgresql/postgresql.conf
COPY ./compose/local/db/pg_hba.conf /etc/postgresql/pg_hba.conf
COPY ./compose/production/db/maintenance /home/maintenance
COPY ./backups /backups

# Configura PostgreSQL para usar el archivo de configuración personalizado
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
