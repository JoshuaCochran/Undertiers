# Generated by Django 2.2.2 on 2019-07-16 11:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('undertiers', '0007_auto_20190716_0246'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='unitloc',
            name='pos',
        ),
    ]
