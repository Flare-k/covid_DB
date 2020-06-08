from django.shortcuts import render
from cloud.models import File
# from django.views.generic import View
# from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import boto3
import os
import json
from django.http import JsonResponse
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from cloud.serializers import (
    FileSerializer
)
from accounts.serializers import (
    UserSerializer
)

#from cloud.aws import aws_key
import configparser
from .s3_function import *
config = configparser.ConfigParser()
config.read('config.ini')

class uploadFiles(generics.GenericAPIView):
    """
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    """
    def post(self, request, *args, **kwargs):
        file=request.FILES.get('file')
        s3_upload_file('temp', file)
        print(file)
        return  Response({'file':file.name})
class downloadFiles(generics.GenericAPIView):
    def get(self,request):
        file=request.GET.get('file')
        file='temptext1 (1).txt'
        print(request.POST)
        print('zz')
        download_file=s3_download_file(file)
        response = HttpResponse(download_file['Body'].read())
        response['Content-Type'] = download_file['ContentType']
        response['Content-Length'] = download_file['ContentLength']
        response['Content-Disposition'] = 'attachment; filename=' + file
        response['Accept-Ranges'] = 'bytes'
        print(response)
        return response