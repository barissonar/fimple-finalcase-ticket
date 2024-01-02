from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import TicketSerializer
from .serializer import TicketResponseSerializer
from .serializer import AdminSerializer
from rest_framework import status
from .models import Ticket_Request
from .models import Ticket_Response
from .models import Ticket_Request_Image
from django.contrib.auth.models import User
from django.db.models import Q
import jwt, datetime
import random

# Create your views here.
def random_code_create():
    return ''.join(random.choices('0123456789', k=10))

@api_view(["POST"])
def ticket_create(request):

    print(request.FILES.get('files'))

    serializer = TicketSerializer(data=request.data)

    if serializer.is_valid():
        Ticket_Request_obj = serializer.save()
        files = request.FILES.getlist('files')
        print(files,"data geliyor")
        if files:
            for file in files:
               Ticket_Request_Image.objects.create(image_path=file,ticket_request=Ticket_Request_obj)
        random_ticket_code = random_code_create()
        isDefined = Ticket_Request.objects.filter(ticket_code=random_ticket_code).exists()
        if isDefined:
            random_ticket_code = random_code_create()
        Ticket_Request_obj.ticket_code = random_ticket_code
        Ticket_Request_obj.save()
        return Response(random_ticket_code,status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def ticket_query_user(request, ticketcode):
    try:
        Ticket_Request_obj = Ticket_Request.objects.get(ticket_code=ticketcode)
        Ticket_Response_obj = Ticket_Response.objects.filter(ticket_request=Ticket_Request_obj)
        Ticket_Request_serializer = TicketSerializer(Ticket_Request_obj)
        Ticket_Response_serializer = TicketResponseSerializer(Ticket_Response_obj,many=True)
        response_data = {
            'ticket_detail': Ticket_Request_serializer.data,
            'ticket_responses': Ticket_Response_serializer.data
        }
        print(response_data)

        return Response(response_data, status=status.HTTP_200_OK)
    except Ticket_Request.DoesNotExist:
        print("bulunamadı")
        return Response("No such ticket found. Please enter the correct ticket number.", status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def admin_login(request):
    username = request.data["username"]
    password = request.data["password"]

    user = User.objects.filter(username=username).first()

    if user is None:
        print("kullanıcı bulunamadı")
        return Response("Böyle bir kullanıcı bulunamadı.", status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(password):
        print("kullanıcı bulundu şifre yanlış")
        return Response("Şifre yanlış.", status=status.HTTP_401_UNAUTHORIZED)

    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    token = jwt.encode(payload, 'secret',  algorithm='HS256')

    response = Response()

    response.set_cookie(key="jwt", value=token, httponly=True)

    response.data = {
        "jwt": token
    }


    return response


@api_view(["GET"])
def admin_authanticate(request):

    token = request.COOKIES.get('jwt')

    if not token:
       return Response('cookie bulunamadı')

    try:
       payload = jwt.decode(token, 'secret', algorithms=['HS256'])

    except jwt.ExpiredSignatureError:
       return Response('Kimlik doğrulama başarısız. Kimliğin süresi dolmuş. veya hatalı')

    user = User.objects.filter(id=payload['id']).first()
    serializer = AdminSerializer(user)
    return Response(serializer.data)

@api_view(["POST"])
def admin_logout(request):
   response = Response()
   response.delete_cookie('jwt')
   response.data = {
       "messaga":"cookie silindi."
   }
   print('cookie silindi.')
   return response


@api_view(["GET"])
def active_tickets(request):
    try:
        Ticket_Request_objs = Ticket_Request.objects.filter(status=3)

        ticket_data = []

        for ticket_request in Ticket_Request_objs:
            ticket_responses = Ticket_Response.objects.filter(ticket_request=ticket_request)
            ticket_request_serializer = TicketSerializer(ticket_request)
            ticket_response_serializer = TicketResponseSerializer(ticket_responses, many=True)

            ticket_data.append({
                'ticket_detail': ticket_request_serializer.data,
                'ticket_responses': ticket_response_serializer.data,
            })

        return Response(ticket_data, status=status.HTTP_200_OK)

    except Ticket_Request.DoesNotExist:
        return Response("No such ticket found. Please enter the correct ticket number.", status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def ticket_history(request):
    try:
        Ticket_Request_objs = Ticket_Request.objects.filter(Q(status=1) | Q(status=2))

        ticket_data = []

        for ticket_request in Ticket_Request_objs:
            ticket_responses = Ticket_Response.objects.filter(ticket_request=ticket_request)
            ticket_request_serializer = TicketSerializer(ticket_request)
            ticket_response_serializer = TicketResponseSerializer(ticket_responses, many=True)

            ticket_data.append({
                'ticket_detail': ticket_request_serializer.data,
                'ticket_responses': ticket_response_serializer.data,
            })

        return Response(ticket_data, status=status.HTTP_200_OK)

    except Ticket_Request.DoesNotExist:
        return Response("No such ticket found. Please enter the correct ticket number.", status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def ticket_query_admin(request, ticketid):
    try:
        Ticket_Request_obj = Ticket_Request.objects.get(pk=ticketid)
        Ticket_Response_obj = Ticket_Response.objects.filter(ticket_request=Ticket_Request_obj)
        Ticket_Request_serializer = TicketSerializer(Ticket_Request_obj)
        Ticket_Response_serializer = TicketResponseSerializer(Ticket_Response_obj,many=True)
        response_data = {
            'ticket_detail': Ticket_Request_serializer.data,
            'ticket_responses': Ticket_Response_serializer.data
        }
        print(response_data)

        return Response(response_data, status=status.HTTP_200_OK)
    except Ticket_Request.DoesNotExist:
        print("bulunamadı")
        return Response("No such ticket found. Please enter the correct ticket number.", status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_request_admin(request, ticketid):
    Ticket_Request_obj = Ticket_Request.objects.get(pk=ticketid)
    serializer = TicketSerializer(Ticket_Request_obj, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def create_request_admin(request, ticketid):
    Ticket_Request_obj = Ticket_Request.objects.get(pk=ticketid)
    serializer = TicketResponseSerializer(data=request.data)
    if serializer.is_valid():
        response = serializer.validated_data.get("response")
        create_date = serializer.validated_data.get("create_date")
        Response_obj = Ticket_Response(response=response, create_date=create_date,ticket_request=Ticket_Request_obj)
        Response_obj.save()
        return Response("mesaj başarıyla oluşturuldu.", status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
















