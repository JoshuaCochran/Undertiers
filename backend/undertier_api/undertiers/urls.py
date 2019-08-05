from django.urls import path, re_path, include

from . import views
from knox import views as knox_views

urlpatterns = [
    path('auth/login/', views.LoginView.as_view(), name='knox_login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_loutout_all'),
    path('account/', include('djoser.urls')),
    path('account/', include('djoser.urls.authtoken')),
    path('boards/', views.ListBoards.as_view()), # Gives a list of all maps (TODO: Add sorting options)
    path('boards/add/', views.AddUnitToBoard.as_view()),
    path('boards/me/', views.ListMyBoards.as_view({'get': 'list',})),
    path('boards/update/<int:pk>/', views.UpdateBoard.as_view()),
    path('boards/<int:pk>/', views.DetailBoard.as_view()),# Gives a detailed list of all items on a single map
    path('maps/<int:pk>/', views.DetailMap.as_view()),
    path('alliances/', views.ListAlliances.as_view()), # Gives a list of all alliances (TODO: Add sorting options)
    path('alliances/<int:pk>/', views.DetailAlliance.as_view()), # Gives a detailed description of a single alliance
    path('units/', views.ListUnits.as_view()), # Gives a list of all units (TODO: Add sorting options)
    path('units/<int:pk>/', views.DetailUnit.as_view()), # Gives a detailed description of a single unit
]