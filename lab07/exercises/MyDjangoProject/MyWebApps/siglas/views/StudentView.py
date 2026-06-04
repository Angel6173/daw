from django.shortcuts import render, get_object_or_404  # <-- Cambiado a 404
from django.views import View
from ..models.Student import Student

class StudentListView(View):
    def get(self, request):
        students = Student.objects.filter(status=True).order_by('fathersurname', 'mothersurname')
        context = {
            'students': students,
            'title': 'LISTADO DE ESTUDIANTES'
        }
        return render(request, 'students/student_list.html', context)

class StudentDetailView(View):
    def get(self, request, pk):
        # Asegúrate de que aquí abajo también esté usando get_object_or_404
        student = get_object_or_404(Student, pk=pk)
        context = {
            'student': student,
            'title': f'DETALLE DE: {student.names}'
        }
        return render(request, 'students/student_detail.html', context)