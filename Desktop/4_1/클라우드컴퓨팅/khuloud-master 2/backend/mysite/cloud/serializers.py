from rest_framework import serializers
from .models import File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['name', 'isFolder', 'path', 'owner',
                  'filesize', 'createdDate', 'modifiedDate']
