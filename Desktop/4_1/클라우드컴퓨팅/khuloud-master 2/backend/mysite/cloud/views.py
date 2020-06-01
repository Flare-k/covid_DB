from django.shortcuts import render
from cloud.models import File
from django.http import HttpResponse
import boto3
import os
import json
from django.http import JsonResponse
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.core.exceptions import PermissionDenied

from cloud.serializers import (
    FileSerializer
)
from accounts.serializers import (
    UserSerializer
)

import configparser
from .s3_function import *
from cloud import s3_function

config = configparser.ConfigParser()
config.read('config.ini')


class uploadFiles(generics.GenericAPIView):
    '''
    permission_classes = [
        permissions.IsAuthenticated,
    ]
'''

    def post(self, request, *args, **kwargs):
        #user = UserSerializer(self.request.user).data
        # print(user)
        file = request.FILES.get('file')
        s3_upload_file('temp', file)
        print(file)
        return Response({"file": file.name})


class downloadFiles(generics.GenericAPIView):
    def get(self, request):
        file = request.GET.get('file')
        file = 'temptext1 (1).txt'
        print(request.POST)
        print('zz')
        download_file = s3_download_file(file)
        response = HttpResponse(download_file['Body'].read())
        response['Content-Type'] = download_file['ContentType']
        response['Content-Length'] = download_file['ContentLength']
        response['Content-Disposition'] = 'attachment; filename=' + file
        response['Accept-Ranges'] = 'bytes'
        print(response)
        return response


class FileView(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        # user token 권한 확인 후 user 정보 저장
        user = UserSerializer(self.request.user).data
        print(user, request.data)
        return Response({'files': 'file'})


class FolderView(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        user = UserSerializer(self.request.user).data
        print(user)
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"file": serializer.data})
        return Response(serializer.errors)


class FileList(generics.GenericAPIView):
    '''
    permission_classes = [
        permissions.IsAuthenticated
    ]
    '''
#     s3_client = boto3.client(
#         's3',
#         aws_access_key_id=config['aws']['AWS_ACCESS_KEY_ID'],
#         aws_secret_access_key=config['aws']['AWS_SECRET_ACCESS_KEY']
#     )
#     s3 = boto3.resource('s3', aws_access_key_id=config['aws']['AWS_ACCESS_KEY_ID'],
#                         aws_secret_access_key=config['aws']['AWS_SECRET_ACCESS_KEY'])

    '''
    def get(self, request, *args, **kwargs):
        user = UserSerializer(self.request.user).data
        print(user, request.data)
        path = request.GET.get('path', None)
        queryset = File.objects.filter(path=path)
        serializer = FileSerializer(queryset, many=True)
        return JsonResponse({"file": serializer.data})
    '''

    def get(self, request, path="temp", format=None):
        permission_classes = [
            permissions.IsAuthenticated,
        ]
        user = UserSerializer(self.request.user).data
        print(user)

        user = request.user
        data = s3_function.list_path(
            s3_function.bucket, path)
        return Response(data)


#         def merge_dic(x, y):
#             z = x
#             z.update(y)
#             return z
#         '''
#         해당 내용을 동적으로 만들어야 함.
#         '''
#         bucket = "opijaeclouds"
#         bucketMy = self.s3.Bucket(bucket)
#         for obj in bucketMy.objects.all():
#             key = obj.key
#             body = obj.get()['Body'].read()
#             print(key)
#         # get list
#         objects = self.s3_client.list_objects(
#             Bucket=bucket, Prefix='{}/{}/'.format("cloud", "test"), Delimiter='/')
#         # get files
#         contents = objects.get('Contents')
#         Folders = {}
#         Files = {}
#         All = {}
#         files = []
#         for obj in contents:
#             file_folder = obj.get('Key').split('/')
#             for i in range(len(obj.get('Key').split('/'))):
#                 if '.' not in file_folder[i]:
#                     directory = file_folder[i]
#                     inputFolder = {"Folder"+str(i+1): directory}
#                     merge_dic(Folders, inputFolder)
#         cnt = 0
#         for obj in contents:
#             file_folder = obj.get('Key').split('/')
#             for i in range(len(obj.get('Key').split('/'))):
#                 if '.' in file_folder[i]:
#                     file = file_folder[i]
#                     inputFile = {"File"+str(cnt+1): file}
#                     cnt += 1
#                     files.append(inputFile)
#         merge_dic(All, {"Folder": Folders})
#         merge_dic(All, {"File": files})
#         return JsonResponse(All)
