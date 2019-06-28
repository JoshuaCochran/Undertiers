from django.urls import path

from . import views

urlpatterns = [
    path('maps/', views.ListMaps.as_view()),
    path('maps/<int:pk>/', views.DetailMap.as_view()),
    path('alliances/', views.ListAlliances.as_view()),
    path('alliances/<int:pk>/', views.DetailAlliance.as_view()),
    path('units/', views.ListUnits.as_view()),
    path('units/<int:pk>/', views.DetailUnit.as_view()),
]