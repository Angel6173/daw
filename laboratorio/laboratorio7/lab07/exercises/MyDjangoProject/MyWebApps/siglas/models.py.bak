from django.db import models


class Users(models.Model):
    username = models.CharField(
        max_length=50,
        db_column='username'
    )

    email = models.CharField(
        max_length=100,
        db_column='email'
    )

    password = models.CharField(
        max_length=255,
        db_column='password'
    )

    status = models.BooleanField(
        default=True,
        db_column='status'
    )

    created = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True,
        db_column='created'
    )

    modified = models.DateTimeField(
        auto_now=True,
        blank=True,
        null=True,
        db_column='modified'
    )

    created_0 = models.ForeignKey(
        'self',
        models.DO_NOTHING,
        db_column='created_id',
        blank=True,
        null=True,
        related_name='users_created'
    )

    modified_0 = models.ForeignKey(
        'self',
        models.DO_NOTHING,
        db_column='modified_id',
        blank=True,
        null=True,
        related_name='users_modified'
    )

    class Meta:
        managed = False
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

        indexes = [
            models.Index(
                fields=['username'],
                name='idx_users_username'
            ),

            models.Index(
                fields=['email'],
                name='idx_users_email'
            ),

            models.Index(
                fields=['status'],
                name='idx_users_status'
            ),
        ]

    def __str__(self):
        return self.username


class Student(models.Model):
    names = models.CharField(
        max_length=100,
        db_column='names'
    )

    fathersurname = models.CharField(
        max_length=100,
        db_column='fathersurname'
    )

    mothersurname = models.CharField(
        max_length=100,
        db_column='mothersurname'
    )

    gender = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        db_column='gender'
    )

    address = models.TextField(
        blank=True,
        null=True,
        db_column='address'
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        db_column='phone'
    )

    note = models.TextField(
        blank=True,
        null=True,
        db_column='note'
    )

    user = models.ForeignKey(
        'Users',
        models.DO_NOTHING,
        db_column='user_id',
        blank=True,
        null=True
    )

    status = models.BooleanField(
        default=True,
        db_column='status'
    )

    created = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True,
        db_column='created'
    )

    modified = models.DateTimeField(
        auto_now=True,
        blank=True,
        null=True,
        db_column='modified'
    )

    created_0 = models.ForeignKey(
        'Users',
        models.DO_NOTHING,
        db_column='created_id',
        blank=True,
        null=True,
        related_name='students_created'
    )

    modified_0 = models.ForeignKey(
        'Users',
        models.DO_NOTHING,
        db_column='modified_id',
        blank=True,
        null=True,
        related_name='students_modified'
    )

    class Meta:
        managed = False
        db_table = 'students'
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

        indexes = [
            models.Index(
                fields=['fathersurname'],
                name='idx_students_father'
            ),

            models.Index(
                fields=['mothersurname'],
                name='idx_students_mother'
            ),

            models.Index(
                fields=['status'],
                name='idx_students_status'
            ),

            models.Index(
                fields=['user'],
                name='idx_students_user'
            ),
        ]

    def __str__(self):
        return f"{self.fathersurname} {self.mothersurname}, {self.names}"


class Courses(models.Model):
    coursename = models.CharField(
        max_length=150,
        db_column='coursename'
    )

    credits = models.IntegerField(
        db_column='credits'
    )

    description = models.TextField(
        blank=True,
        null=True,
        db_column='description'
    )

    status = models.BooleanField(
        default=True,
        db_column='status'
    )

    created = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True,
        db_column='created'
    )

    modified = models.DateTimeField(
        auto_now=True,
        blank=True,
        null=True,
        db_column='modified'
    )

    created_0 = models.ForeignKey(
        'Users',
        models.DO_NOTHING,
        db_column='created_id',
        blank=True,
        null=True,
        related_name='courses_created'
    )

    modified_0 = models.ForeignKey(
        'Users',
        models.DO_NOTHING,
        db_column='modified_id',
        blank=True,
        null=True,
        related_name='courses_modified'
    )

    class Meta:
        managed = False
        db_table = 'courses'
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

        indexes = [
            models.Index(
                fields=['coursename'],
                name='idx_courses_name'
            ),

            models.Index(
                fields=['status'],
                name='idx_courses_status'
            ),
        ]

    def __str__(self):
        return self.coursename


class CoursesStudents(models.Model):
    student = models.ForeignKey(
        'Student',
        models.DO_NOTHING,
        db_column='student_id'
    )

    course = models.ForeignKey(
        'Courses',
        models.DO_NOTHING,
        db_column='course_id'
    )

    enrollmentdate = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True,
        db_column='enrollmentdate'
    )

    status = models.BooleanField(
        default=True,
        db_column='status'
    )

    created = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=True,
        db_column='created'
    )

    modified = models.DateTimeField(
        auto_now=True,
        blank=True,
        null=True,
        db_column='modified'
    )

    created_0 = models.ForeignKey(
        'Users',
        models.DO_NOTHING,
        db_column='created_id',
        blank=True,
        null=True,
        related_name='enrollments_created'
    )

    modified_0 = models.ForeignKey(
        'Users',
        models.DO_NOTHING,
        db_column='modified_id',
        blank=True,
        null=True,
        related_name='enrollments_modified'
    )

    class Meta:
        managed = False
        db_table = 'courses_students'
        verbose_name = 'Enrollment'
        verbose_name_plural = 'Enrollments'

        unique_together = (
            ('course', 'student'),
        )

        indexes = [
            models.Index(
                fields=['student'],
                name='idx_enroll_student'
            ),

            models.Index(
                fields=['course'],
                name='idx_enroll_course'
            ),

            models.Index(
                fields=['status'],
                name='idx_enroll_status'
            ),

            models.Index(
                fields=['course', 'student'],
                name='idx_enroll_course_student'
            ),
        ]

    def __str__(self):
        return f"{self.student} - {self.course}"