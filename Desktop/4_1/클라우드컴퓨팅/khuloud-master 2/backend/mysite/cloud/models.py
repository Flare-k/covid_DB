from django.db import models
from django.utils import timezone
class File(models.Model):
    name = models.CharField(null=True, default='', max_length=50)
    isFolder = models.BooleanField()
    path = models.TextField()
    owner = models.CharField(null=True, default='', max_length=30)
    filesize = models.IntegerField(default=0)
    createdDate = models.DateTimeField(default=timezone.now)
    modifiedDate = models.DateTimeField(blank=True, null=True)
    # file = models.FileField(upload_to=None, max_length=100) #일단 보류
    class Meta:
        ordering = ['createdDate']