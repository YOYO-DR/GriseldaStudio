# Generated by Django 5.0.6 on 2024-06-11 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='image',
            field=models.ImageField(null=True, upload_to='user/%Y/%m/'),
        ),
    ]
