from django.db import models

# Create your models here.
STATUS_CHOICES = [
    ('FÜGGŐBEN', 'Függőben'),
    ('FOLYAMATBAN', 'Folyamatban'),
    ('BEFEJEZETT', 'Befejezett'),
    ('LEMONDOTT', 'Lemondott'),
]

class Appointment(models.Model):
    date = models.DateField()
    start_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='FÜGGŐBEN')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Időpont {self.date} napon {self.start_time} kezdettel {self.status} státuszban van."