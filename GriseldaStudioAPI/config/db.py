import os

#AZURE_POSTGRESQL_CONNECTIONSTRING_LOCAL = dbname=nombreBD host=elHost port=3306 sslmode=require user=usuario password=pass

conn={
    "local": os.getenv('AZURE_POSTGRESQL_CONNECTIONSTRING_LOCAL'),
    "prod": os.getenv('AZURE_POSTGRESQL_CONNECTIONSTRING_PROD'),
    "prod_test": os.getenv('AZURE_POSTGRESQL_CONNECTIONSTRING_PROD_TEST')
}

params={c:{} for c,v in conn.items()}
for key in conn:
    if conn[key] is not None:
      params[key] = {pair.split('=')[0]: pair.split('=')[1] for pair in conn[key].split(' ')}

BDCONFIG={
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': params["local"].get("dbname"),
        'USER': params["local"].get("user"),
        'PASSWORD': params["local"].get("password"),
        'HOST': params["local"].get("host"),
        'PORT': params["local"].get("port"),
    },
    'production': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': params["prod"].get("dbname"),
        'USER': params["prod"].get("user"),
        'PASSWORD': params["prod"].get("password"),
        'HOST': params["prod"].get("host"),
        'PORT': params["prod"].get("port"),
    },
    'production_test': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': params["prod_test"].get("dbname"),
        'USER': params["prod_test"].get("user"),
        'PASSWORD': params["prod_test"].get("password"),
        'HOST': params["prod_test"].get("host"),
        'PORT': params["prod_test"].get("port"),
    }
}
