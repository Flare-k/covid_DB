from django.urls import path, include
from cloud import views

urlpatterns = [
    # 폴더 업로드
    path('files/uploadFiles', views.uploadFiles.as_view()),
    path('files/downloadFiles', views.downloadFiles.as_view()),
    # 파일 업로드
    #path('files/uploadFiles', views.FileView.as_view()),
    # 파일 리스트 전체 출력
    #path('files/fileList', views.FileList.as_view()),
   # path('files/uploadFolder', views.FolderView.as_view()),
    # 파일 삭제
#     path('files/deleteFile', views.FileDelete.as_view()),
]