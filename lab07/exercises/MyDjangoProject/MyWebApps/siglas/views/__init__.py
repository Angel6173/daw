from .UserView import UserListView
from .StudentView import StudentListView, StudentDetailView
from .CourseView import CourseListView
from .CoursesStudentsView import CoursesStudentsListView  # <-- Nombre correcto importado

__all__ = [
    'UserListView',
    'StudentListView',
    'StudentDetailView',
    'CourseListView',
    'CoursesStudentsListView'  # <-- Nombre correcto exportado
]