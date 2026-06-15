from django.shortcuts import render

from .models import Student 

def listar_datos(request):
   
    objeto_listado = Student.objects.all()
    
    return render(request, 'siglas/listar.html', {'lista_elementos': objeto_listado})