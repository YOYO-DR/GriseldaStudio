from django.urls import path

from .user.views import UserListView

urlpatterns = [
    path('usuarios/',UserListView.as_view(),name='usuarios'),
]
