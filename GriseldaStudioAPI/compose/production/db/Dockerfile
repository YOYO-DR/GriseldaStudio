# Usamos la imagen oficial de PostgreSQL
FROM postgres:16

# Exponer el puerto 5432 para conexiones externas
EXPOSE 5432

# Copia los archivos de configuración personalizados al contenedor
COPY ./compose/production/db/postgresql.conf /etc/postgresql/postgresql.conf
COPY ./compose/production/db/pg_hba.conf /etc/postgresql/pg_hba.conf
COPY ./compose/production/db/maintenance /home/maintenance
# COPY ./backups /backups

# Dar permiso a los scripts de mantenimiento
RUN chmod +x /home/maintenance/*

# Configura PostgreSQL para usar el archivo de configuración personalizado
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
