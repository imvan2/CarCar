from django.urls import path
from .views import api_list_services, api_list_technicians, api_detail_service

urlpatterns = [
    path("services/", api_list_services, name="api_list_services"),
    path("services/<int:pk>/", api_detail_service, name="api_detail_service"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
]
