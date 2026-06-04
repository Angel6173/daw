from django.contrib import admin
from django.urls import path, include  # Asegúrate de importar 'include'

urlpatterns = [
    path('admin/', admin.site.urls),
    # Enlazamos el archivo urls.py de tu app bajo el prefijo 'proyecto/'
    path('proyecto/', include('MyWebApps.siglas.urls')),
]