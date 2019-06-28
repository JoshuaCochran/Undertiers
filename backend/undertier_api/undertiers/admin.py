from django.contrib import admin

# Register your models here.
from .models import Unit, Map, UnitLoc, Alliance

admin.site.register(Unit)
admin.site.register(Map)
admin.site.register(UnitLoc)
admin.site.register(Alliance)