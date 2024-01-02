from rest_framework import serializers
from .models import Ticket_Request
from .models import Ticket_Response
from django.contrib.auth.models import User

class TicketSerializer(serializers.ModelSerializer):



    class Meta:
        model = Ticket_Request
        fields = ['id','name','surname','age','tc','subject','complaint_reason','address','create_date','ticket_code','status']

    def create(self, validated_data):
        return Ticket_Request.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.surname = validated_data.get('surname', instance.surname)
        instance.age = validated_data.get('age', instance.age)
        instance.tc = validated_data.get('tc', instance.tc)
        instance.subject = validated_data.get('subject', instance.subject)
        instance.complaint_reason = validated_data.get('complaint_reason', instance.complaint_reason)
        instance.address = validated_data.get('address', instance.address)
        instance.ticket_code = validated_data.get('ticket_code', instance.ticket_code)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance


class TicketResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket_Response
        fields = ['id','response','create_date']


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
