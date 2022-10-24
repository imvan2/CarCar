from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True, null=True)
    
class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField()

class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    owner = models.CharField(max_length=30)
    appointment_time = models.DateTimeField()
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
    service_reason = models.CharField(max_length=200)
    if_finished = models.BooleanField(default=False, null=True)
    vip = models.BooleanField(default=False, null=True)