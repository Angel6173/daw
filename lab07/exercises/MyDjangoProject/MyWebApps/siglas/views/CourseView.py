from django.shortcuts import render
from django.views import View
from ..models.Courses import Courses

class CourseListView(View):
    def get(self, request):
        # Lógica: Cursos activos ordenados por nombre
        courses = Courses.objects.filter(status=True).order_by('coursename')
        context = {
            'courses': courses,
            'title': 'CURSOS DISPONIBLES'
        }
        return render(request, 'courses/course_list.html', context)