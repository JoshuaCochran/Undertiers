# Generated by Django 2.2.2 on 2019-08-10 22:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('undertiers', '0015_auto_20190810_1503'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upvote',
            name='user',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]