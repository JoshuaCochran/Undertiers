from django.urls import path

from . import views

urlpatterns = [
    path('maps/', views.ListMaps.as_view()), # Gives a list of all maps (TODO: Add sorting options)
    path('maps/add', views.AddUnitToMap.as_view()),
    path('maps/<int:pk>/', views.DetailMap.as_view({'get': 'list', 'put': 'update', 'post': 'create'})), # Gives a detailed list of all items on a single map
    path('alliances/', views.ListAlliances.as_view()), # Gives a list of all alliances (TODO: Add sorting options)
    path('alliances/<int:pk>/', views.DetailAlliance.as_view()), # Gives a detailed description of a single alliance
    path('units/', views.ListUnits.as_view()), # Gives a list of all units (TODO: Add sorting options)
    path('units/<int:pk>/', views.DetailUnit.as_view()), # Gives a detailed description of a single unit
]