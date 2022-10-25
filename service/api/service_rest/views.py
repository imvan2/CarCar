from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import ServiceAppointment, AutomobileVO, Technician

# Create your views here.

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]
    
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href"]
    
class ServiceListEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "vin", 
        "owner",
        "appointment_time",
        "service_reason",
        ]
    encoders = { "technician": TechnicianListEncoder}
    
    def get_extra_data(self, o):
        count = AutomobileVO.objects.filter(vin=o.vin).count()
        return {"is_vip": count > 0}

class ServiceDetailEncoder(ModelEncoder):
    model = ServiceAppointment
    properties= [
        "vin",
        "owner",
        "appointment_time",
        "service_reason",
        "if_finished",
    ]
    encoders = { "technician": TechnicianListEncoder}
    
    def get_extra_data(self, o):
        count = AutomobileVO.objects.filter(vin=o.vin).count()
        return {"is_vip": count > 0}
    
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
        
        # try and except for the technician
        try:
            number = content["technician"]
            tech = Technician.objects.get(employee_number=number)
            content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid Technician ID"}, status=400)
            
        service = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False,
        )