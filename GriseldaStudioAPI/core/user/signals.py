from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import User, UserProfile

@receiver(post_save, sender=User) # agrego esta señal para que cuando se cree un usuario se cree un perfil de usuario
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

# Para encritar la contraseña si se llega a cambiar
@receiver(pre_save, sender=User)
def hash_user_password(sender, instance, **kwargs):
    if instance.pk is not None:
        old_password = User.objects.get(pk=instance.pk).password
        if old_password != instance.password:
            instance.set_password(instance.password)