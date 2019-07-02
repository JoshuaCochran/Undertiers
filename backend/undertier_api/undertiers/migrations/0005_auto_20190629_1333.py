# Generated by Django 2.2.2 on 2019-06-29 20:33

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('undertiers', '0004_auto_20190627_2035'),
    ]

    operations = [
        migrations.AddField(
            model_name='unit',
            name='tier',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, 'Value must be between 1 and 5'), django.core.validators.MaxValueValidator(5, 'Value must be between 1 and 5')]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='alliance',
            name='icon_url',
            field=models.URLField(verbose_name='http://localhost:8000/static/alliance_icons/brawny.png'),
        ),
        migrations.AlterField(
            model_name='unit',
            name='icon_url',
            field=models.URLField(default='http://localhost:8000/static/unit_icons/axe.png'),
        ),
        migrations.AlterField(
            model_name='unitloc',
            name='pos',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0, 'Value must be non-negative'), django.core.validators.MaxValueValidator(31, 'Value must be below 32')]),
        ),
    ]