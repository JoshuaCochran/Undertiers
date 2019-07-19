# Generated by Django 2.2.2 on 2019-07-19 09:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('undertiers', '0008_remove_unitloc_pos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='unitloc',
            name='posx',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, 'Value must be non-negative'), django.core.validators.MaxValueValidator(7, 'Value must be below 32')]),
        ),
        migrations.AlterField(
            model_name='unitloc',
            name='posy',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, 'Value must be non-negative'), django.core.validators.MaxValueValidator(3, 'Value must be below 32')]),
        ),
    ]