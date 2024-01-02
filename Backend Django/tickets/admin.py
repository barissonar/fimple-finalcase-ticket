from django.contrib import admin
from .models import Ticket_Request,Ticket_Response,Ticket_Request_Image
# Register your models here.

@admin.register(Ticket_Request)
class Ticket_Request_Admin(admin.ModelAdmin):
    list_display = ('name','surname','age','tc','complaint_reason','address')

@admin.register(Ticket_Response)
class Ticket_Response_Admin(admin.ModelAdmin):
    list_display = ('response','ticket_request')


@admin.register(Ticket_Request_Image)
class Image_Admin(admin.ModelAdmin):
    list_display = ('ticket_request',)