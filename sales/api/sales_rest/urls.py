from .views import api_list_sales_reps
from django.urls import path, include

urlpatterns = [
    path('salesreps/', api_list_sales_reps, name="api_list_sales_reps"),
]
