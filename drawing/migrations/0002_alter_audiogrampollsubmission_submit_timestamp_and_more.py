# Generated by Django 5.0.6 on 2024-06-10 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drawing', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audiogrampollsubmission',
            name='submit_timestamp',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterModelTable(
            name='audiogramcanvas',
            table='audiogram_canvas_images',
        ),
        migrations.AlterModelTable(
            name='audiogrampollsubmission',
            table='audiogram_poll_submissions',
        ),
    ]
