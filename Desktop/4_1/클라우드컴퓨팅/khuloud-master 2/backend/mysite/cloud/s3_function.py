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
        location = location+'/'
        s3client.put_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=location + file.name, Body=file,
                            ACL="public-read")
    except Exception as e:
        print('Error on line {}'.format(
            sys.exc_info()[-1].tb_lineno), type(e).__name__, e)
        raise Exception('Upload Failed! ', e)


def s3_download_file(file):
    try:
        # file='/'+file
        print(file)
        #print(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file)
        response = s3client.get_object(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file)
        return response
    except Exception as e:
        print('Error on line {}'.format(
            sys.exc_info()[-1].tb_lineno), type(e).__name__, e)
        raise Exception('Download Failed! ', e)


def list_path(bucket, path):

    files = []
    # get list
    objects = s3client.list_objects(
        Bucket=settings.AWS_STORAGE_BUCKET_NAME, Prefix='{}/'.format(path), Delimiter='/')
    # get sub directorys
    common_prefixes = objects.get('CommonPrefixes')
    print(common_prefixes)
    if common_prefixes:
        for obj in common_prefixes:
            files.append(
                {'type': 'directory', 'name': obj.get('Prefix').split('/')[-2]})

    # get files
    contents = objects.get('Contents')
    if contents:
        for obj in contents:
            file = obj.get('Key').split('/')[-1]
            if file != '':
                files.append({'type': 'file', 'name': file})

    return {'files': files}
