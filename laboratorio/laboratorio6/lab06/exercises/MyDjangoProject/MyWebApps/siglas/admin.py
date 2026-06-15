from django.contrib import admin
from .models import Courses, CoursesStudents, Student, Users

admin.site.register(Courses)
admin.site.register(CoursesStudents)
admin.site.register(Student)
admin.site.register(Users)