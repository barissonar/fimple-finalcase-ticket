from django.urls import path
from . import views

urlpatterns = [

    path('user/create-request',views.ticket_create),
    path('user/query-request/<int:ticketcode>',views.ticket_query_user),
    path('admin/login',views.admin_login),
    path('admin/authanticate',views.admin_authanticate),
    path('admin/logout',views.admin_logout),
    path('admin/ticket-list/activeticket',views.active_tickets),
    path('admin/ticket-list/tickethistory',views.ticket_history),
    path('admin/query-request/<int:ticketid>',views.ticket_query_admin),
    path('admin/update-request/<int:ticketid>',views.update_request_admin),
    path('admin/create-request/<int:ticketid>',views.create_request_admin),



]
