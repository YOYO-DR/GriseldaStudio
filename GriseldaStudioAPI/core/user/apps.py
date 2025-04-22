from django.apps import AppConfig

class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.user'
    label = 'core_user'

    def ready(self): # se importa la señales del archivo user/signals.py
      import core.user.signals
