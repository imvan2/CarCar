from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, SalesRep, SalesCustomer, SaleRecord

# Create your views here.


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href"]


class SalesRepDetailEncoder(ModelEncoder):
    model = SalesRep
    properties = ["name", "employee_id"]


class SalesCustomerDetailEncoder(ModelEncoder):
    model = SalesCustomer
    properties = ["name", "address", "phone_number"]


class SalesCustomerListEncoder(ModelEncoder):
    model = SalesCustomer
    properties = ["name"]


class SaleRecordListEncoder(ModelEncoder):
    model = SaleRecord
    properties = ["sales_price"]
    encoders = {"sales_rep": SalesRepDetailEncoder(), "sales_customer": SalesCustomerListEncoder,
                "sales_automobile": AutomobileVODetailEncoder}


@require_http_methods(["GET", "POST"])
def api_list_sales_reps(request):

    # GET REQUEST
    if request.method == "GET":
        sales_reps = SalesRep.objects.all()
        return JsonResponse({"sales_reps": sales_reps}, encoder=SalesRepDetailEncoder,)

    # POST REQUEST
    else:
        content = json.loads(request.body)

        try:
            pass
        except:
            pass

    sales_rep = SalesRep.objects.create(**content)
    return JsonResponse(sales_rep, encoder=SalesRepDetailEncoder, safe=False,)
