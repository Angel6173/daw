from django.db import models
from .User import Users
from .Student import Student
from .Courses import Courses

class CoursesStudents(models.Model):
    student = models.ForeignKey(Student, models.DO_NOTHING, db_column='student_id')
    course = models.ForeignKey(Courses, models.DO_NOTHING, db_column='course_id')
    enrollmentdate = models.DateTimeField(auto_now_add=True, blank=True, null=True, db_column='enrollmentdate')
    status = models.BooleanField(default=True, db_column='status')
    
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True, db_column='created')
    modified = models.DateTimeField(auto_now=True, blank=True, null=True, db_column='modified')
    created_id = models.ForeignKey(Users, models.DO_NOTHING, db_column='created_id', blank=True, null=True, related_name='enrollments_created')
    modified_id = models.ForeignKey(Users, models.DO_NOTHING, db_column='modified_id', blank=True, null=True, related_name='enrollments_modified')

    class Meta:
        managed = True
        db_table = 'students_courses'  # Orden alfabético estricto exigido
        verbose_name = 'Courses Student'
        verbose_name_plural = 'Courses Students'

        constraints = [
            models.UniqueConstraint(fields=['course', 'student'], name='unique_course_student_registration')
        ]

    def __str__(self):
        return f"{self.student} -> {self.course}"