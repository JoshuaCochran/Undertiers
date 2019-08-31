# Generated by Django 2.2.2 on 2019-07-16 09:46

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('undertiers', '0006_auto_20190716_0207'),
    ]

    operations = [
        migrations.AddField(
            model_name='unitloc',
            name='posx',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, 'Value must be non-negative'), django.core.validators.MaxValueValidator(8, 'Value must be below 32')]),
        ),
        migrations.AddField(
            model_name='unitloc',
            name='posy',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, 'Value must be non-negative'), django.core.validators.MaxValueValidator(8, 'Value must be below 32')]),
        ),
    ]
