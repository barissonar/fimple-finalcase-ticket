from django.db import models

# Create your models here.


class Ticket_Request(models.Model):

    STATUS_CHOICES = [
        (1, 'çözüldü'),
        (2, 'iptal edildi'),
        (3, 'bekliyor'),
    ]

    name = models.CharField(max_length=50,null=False,blank=False)
    surname = models.CharField(max_length=50, null=False, blank=False)
    age = models.IntegerField(null=False,blank=False)
    tc = models.CharField(max_length=11,null=False,blank=False)
    subject = models.CharField(max_length=100,null=False,blank=False)
    complaint_reason = models.CharField(max_length=500,null=False,blank=False)
    address = models.CharField(max_length=150, null=False, blank=False)
    create_date = models.DateTimeField(null=True, blank=True)
    ticket_code = models.CharField(max_length=10,null=True,blank=True)
    status = models.IntegerField(choices=STATUS_CHOICES, null=True,blank=True,default=3)

    def __str__(self):
        return f"TICKET-ID: {self.id}"

class Ticket_Response(models.Model):

    response = models.CharField(max_length=500,null=False,blank=False)
    ticket_request = models.ForeignKey(Ticket_Request,on_delete=models.CASCADE)
    create_date = models.DateTimeField(null=True,blank=True)


class Ticket_Request_Image(models.Model):
    image_path = models.ImageField(upload_to='images/')
    ticket_request = models.ForeignKey(Ticket_Request, on_delete=models.CASCADE)







