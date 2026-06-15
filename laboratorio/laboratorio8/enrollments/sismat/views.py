from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models.users import Users
from .models.teachers import Teachers
from .models.students import Students
from .models.courses import Courses
from .models.courses_students import CoursesStudents

from .serializers import (
    UserSerializer,
    TeacherSerializer, TeacherDetailSerializer,
    StudentSerializer, StudentDetailSerializer,
    CourseSerializer, CourseDetailSerializer,
    CoursesStudentsSerializer, CoursesStudentsDetailSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    
    queryset = Users.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer


class TeacherViewSet(viewsets.ModelViewSet):

    queryset = Teachers.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TeacherDetailSerializer
        return TeacherSerializer

    def get_queryset(self):
        if self.action == 'retrieve':
            return Teachers.objects.select_related('user_id')
        return Teachers.objects.all()


class StudentViewSet(viewsets.ModelViewSet):

    queryset = Students.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return StudentDetailSerializer
        return StudentSerializer

    def get_queryset(self):
        if self.action == 'retrieve':
            return Students.objects.select_related('user_id').prefetch_related(
                'coursesstudents_set__course'
            )
        return Students.objects.all()


class CourseViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para Courses.
    - list / create / update / delete → CourseSerializer (plano)
    - retrieve (GET /{id}/)           → CourseDetailSerializer (anidado con Teacher + alumnos)
    """
    queryset = Courses.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseSerializer

    def get_queryset(self):
        if self.action == 'retrieve':
            return Courses.objects.select_related('teacher_id').prefetch_related(
                'coursesstudents_set__student'
            )
        return Courses.objects.all()


class CoursesStudentsViewSet(viewsets.ModelViewSet):

    queryset = CoursesStudents.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CoursesStudentsDetailSerializer
        return CoursesStudentsSerializer

    def get_queryset(self):
        if self.action == 'retrieve':
            return CoursesStudents.objects.select_related('course', 'student')
        return CoursesStudents.objects.all()