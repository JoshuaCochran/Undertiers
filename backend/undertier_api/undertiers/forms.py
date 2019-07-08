from django.forms import ModelForm
from .models import Alliance

class SynergiesAdminForm(ModelForm):
    class Meta:
        model = Alliance
        fields = '__all__'
