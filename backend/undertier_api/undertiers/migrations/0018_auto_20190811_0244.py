# Generated by Django 2.2.2 on 2019-08-11 09:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('undertiers', '0017_auto_20190810_1512'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upvote',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
