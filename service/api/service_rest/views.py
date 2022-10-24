from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import ServiceAppointment, AutomobileVO, Technician

# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href"]
    
class ServiceListEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "vin", 
        "owner",
        "appointment_time",
        "technician",
        "service_reason",
        "vip",
        ]

class ServiceDetailEncoder(ModelEncoder):
    model = ServiceAppointment
    properties= [
        "vin",
        "owner",
        "appointment_time",
        "technician",
        "service_reason",
        "if_finished",
        "vip",
    ]
    encoders = { "automobile": AutomobileVOEncoder }
    
class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]
    
@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_services(request):
    if request.method == "GET":
        services = ServiceAppointment.objects.all()
        return JsonResponse(
            {"services": services},
            encoder = ServiceListEncoder,
        )
    else:
        content = json.loads(request.body)
        
        try:
            vin_number = content["vin"]
            vin = AutomobileVO.objects.get(vin=vin_number)
            content["vin"] = vin
            content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False
        
        service = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False,
        )