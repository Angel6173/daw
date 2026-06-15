from django.shortcuts import render
from django.views import View
from ..models.CoursesStudents import CoursesStudents

# Cambiamos el nombre de la clase para que coincida con el modelo y archivo
class CoursesStudentsListView(View):
    def get(self, request):
        # Trae la relación de la tabla intermedia
        courses_students = CoursesStudents.objects.filter(status=True).select_related('student', 'course')
        context = {
            'courses_students': courses_students,
            'title': 'REPORTE GENERAL DE CURSOS Y ESTUDIANTES'
        }
        return render(request, 'courses_students/courses_students_list.html', context)