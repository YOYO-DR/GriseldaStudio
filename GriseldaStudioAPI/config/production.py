import os

from .settings import *  # importamos todo
from .settings import BASE_DIR  # importamos la ruta de inicio

# se agrega los host por medio de las variables de entono que me da Azure
ALLOWED_HOSTS = [i for i in os.environ['WEBSITE_HOSTNAME'].split(
    ",")] if 'WEBSITE_HOSTNAME' in os.environ else []
# se pone las rutas de seguridad
CSRF_TRUSTED_ORIGINS = [i for i in os.environ['WEBSITE_HOSTNAME_HTTP'].split(
    ",")] if 'WEBSITE_HOSTNAME_HTTP' in os.environ else []

CORS_ALLOWED_ORIGINS = [url for url in os.environ['WEBSITE_FRONTEND_URL'].split(
    ",")] if 'WEBSITE_FRONTEND_URL' in os.environ else []

# ponemos el DEBUG en false porque se va a ejecutar en produccion
DEBUG = False

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Add whitenoise middleware after the security middleware
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware'
]
# agregamos el storage
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Pedimos la config de la base de datos
conn_str = os.environ['POSTGRESQL_CONNECTIONSTRING']


# extraemos los valores, y los ponemos en un diccionario para llamarlos mejor
conn_str_params = {pair.split('=')[0]: pair.split('=')[1] for pair in conn_str.split(' ')}

# Este es el valor de la variable de entono que se utiliza en Azure, puede utilizarlas independientemente en azure si quiere, lo utilizao de esta forma para solo poner una sola variable de entorno

# los ponemos en la config de la base de datos
# Después de la configuración inicial de DATABASES

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': conn_str_params['dbname'],
        'HOST': conn_str_params['host'],
        'USER': conn_str_params['user'],
        'PASSWORD': conn_str_params['password'],
        'PORT': conn_str_params['port']
    }
}

# POSTGRESQL_CONNECTIONSTRING = dbname=nombreBD host=elHost port=3306 sslmode=require user=usuario password=pass

# almacenmiento azure
# Configuración para el diccionario de storages
# si estamos en producción o desarrollo, y saber de donde traer la configuración

# azure_storage_blob = os.environ['AZURE_STORAGE_BLOB']
# # AZURE_STORAGE_BLOB = account_name = name  container_name = container  account_key = key
# azure_storage_blob_parametros = {parte.split(' = ')[0]:parte.split(' = ')[1] for parte in azure_storage_blob.split('  ')}

# AZURE_CONTAINER = azure_storage_blob_parametros['container_name']
# AZURE_ACCOUNT_NAME = azure_storage_blob_parametros['account_name']
# AZURE_ACCOUNT_KEY = azure_storage_blob_parametros['account_key']
# STORAGES = {
#     "default": {"BACKEND": "storages.backends.azure_storage.AzureStorage"},
#     "staticfiles": {"BACKEND": "config.azure_storage.PublicAzureStaticStorage"},
#     "media": {"BACKEND": "config.azure_storage.PublicAzureMediaStorage"},
# }
