from django.db import models

# Create your models here.
class Phone_verification(models.Model):
    phone_number = models.CharField(max_length=20, unique=True)
    code = models.CharField(max_length=6)

    def __str__(self):
        return f"Phone Verification for {self.phone_number}"