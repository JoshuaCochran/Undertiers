# Generated by Django 2.2.2 on 2019-07-23 06:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('undertiers', '0009_auto_20190719_0221'),
    ]

    operations = [
        migrations.RenameField(
            model_name='unitloc',
            old_name='map',
            new_name='board',
        ),
    ]