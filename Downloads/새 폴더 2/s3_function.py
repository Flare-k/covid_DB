import boto3
import sys
from django.conf import settings
s3 = boto3.resource('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
s3client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)

def s3_upload_file(location, file):
    try:
        location=location+'/'
        s3client.put_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=location + file.name, Body=file,
                            ACL="public-read")
    except Exception as e:
        print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)
        raise Exception('Upload Failed! ', e)

def s3_download_file(file):
    try:
        #file='/'+file
        print(file)
        #print(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file)
        response = s3client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file)        
        return response
    except Exception as e:
        print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)
        raise Exception('Download Failed! ', e)