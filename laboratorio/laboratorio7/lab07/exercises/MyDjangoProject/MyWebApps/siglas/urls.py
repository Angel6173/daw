from django.urls import path
from .views import UserListView, StudentListView, StudentDetailView, CourseListView, CoursesStudentsListView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user_list'),
    path('students/', StudentListView.as_view(), name='student_list'),
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student_detail'),
    path('courses/', CourseListView.as_view(), name='course_list'),
    # URL adaptada al nombre exacto de tu modelo
    path('courses-students/', CoursesStudentsListView.as_view(), name='courses_students_list'),
]