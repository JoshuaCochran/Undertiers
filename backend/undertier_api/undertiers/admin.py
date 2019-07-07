from django.contrib import admin

# Register your models here.
from .models import Unit, Map, UnitLoc, Alliance
from .forms import SynergiesAdminForm
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

admin.site.register(Unit)
admin.site.register(Map)
admin.site.register(UnitLoc)

class SynergiesAdmin(admin.ModelAdmin, DynamicArrayMixin):
    form = SynergiesAdminForm

admin.site.register(Alliance, SynergiesAdmin)