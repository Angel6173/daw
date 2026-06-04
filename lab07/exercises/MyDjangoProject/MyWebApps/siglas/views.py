from django.shortcuts import render
# Cambia 'Students' por 'Student' (en singular)
from .models import Student 

def listar_datos(request):
    # Cambia también aquí a singular
    objeto_listado = Student.objects.all()
    
    return render(request, 'siglas/listar.html', {'lista_elementos': objeto_listado})