from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'start_time', 'status', 'created_at')
    list_filter =('status', 'date')
    search_fields = ('id', 'status')
    ordering = ('date', 'start_time')