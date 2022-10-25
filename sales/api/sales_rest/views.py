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
    properties = ["name", "phone_number"]


class SaleRecordListEncoder(ModelEncoder):
    model = SaleRecord
    properties = ["sales_price", ]
    encoders = {
        "sales_rep": SalesRepDetailEncoder(),
        "sales_automobile": AutomobileVODetailEncoder()
    }

    def get_extra_data(self, o):
        return {"sales_customer": o.sales_customer.name, "sales_rep_id": o.sales_rep.employee_id,
                "sales_automobile": o.sales_automobile.vin, "sales_rep_name": o.sales_rep.name}


@require_http_methods(["GET", "POST"])
def api_list_sales_reps(request):

    # GET REQUEST
    if request.method == "GET":
        sales_reps = SalesRep.objects.all()
        return JsonResponse({"sales_reps": sales_reps}, encoder=SalesRepDetailEncoder,)

    # POST REQUEST
    else:
        content = json.loads(request.body)

    sales_rep = SalesRep.objects.create(**content)
    return JsonResponse(sales_rep, encoder=SalesRepDetailEncoder, safe=False,)


@require_http_methods(["GET", "POST"])
def api_list_sales_customers(request):

    # GET REQUEST
    if request.method == "GET":
        sales_customers = SalesCustomer.objects.all()
        return JsonResponse({"sales_customers": sales_customers}, encoder=SalesCustomerListEncoder)

    # POST REQUEST
    else:
        content = json.loads(request.body)

        sales_customer = SalesCustomer.objects.create(**content)
        return JsonResponse(sales_customer, encoder=SalesCustomerDetailEncoder, safe=False,)


@require_http_methods(["GET", "POST"])
def api_list_sale_records(request):

    # GET REQUEST
    if request.method == "GET":
        sale_records = SaleRecord.objects.all()
        return JsonResponse({"sale_records": sale_records}, encoder=SaleRecordListEncoder, safe=False,)

    # POST REQUEST
    else:
        content = json.loads(request.body)

        try:
            auto_vin = content["sales_automobile"]
            sales_automobile = AutomobileVO.objects.get(vin=auto_vin)
            content["sales_automobile"] = sales_automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid VIN"}, status=400)

        try:
            rep_employee_id = content["sales_rep"]
            sales_rep = SalesRep.objects.get(employee_id=rep_employee_id)
            content["sales_rep"] = sales_rep
        except SalesRep.DoesNotExist:
            return JsonResponse({"message": "Invalid Sales Rep ID"}, status=400)

        try:
            sales_customer_phone = content["sales_customer"]
            sales_customer = SalesCustomer.objects.get(
                phone_number=sales_customer_phone)
            content["sales_customer"] = sales_customer
        except SalesCustomer.DoesNotExist:
            return JsonResponse({"message": "Invalid customer phone number"}, status=400)

        sale_record = SaleRecord.objects.create(**content)
        return JsonResponse(sale_record, encoder=SaleRecordListEncoder, safe=False,)
