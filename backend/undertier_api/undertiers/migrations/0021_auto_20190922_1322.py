# Generated by Django 2.2.2 on 2019-09-22 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('undertiers', '0020_auto_20190921_1355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='map',
            name='early_game',
            field=models.ManyToManyField(blank=True, related_name='EarlyGame', to='undertiers.Unit'),
        ),
        migrations.AlterField(
            model_name='map',
            name='mid_game',
            field=models.ManyToManyField(blank=True, related_name='MidGame', to='undertiers.Unit'),
        ),
    ]
