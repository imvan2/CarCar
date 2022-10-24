from django.urls import path
from .views import api_list_services, api_list_technicians

urlpatterns = [
    path("services/", api_list_services, name="api_list_services"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
]
