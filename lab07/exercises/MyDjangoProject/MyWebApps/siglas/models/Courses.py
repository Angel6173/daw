from django.db import models
from django.core.validators import MinValueValidator
from .User import Users

class Courses(models.Model):
    coursename = models.CharField(max_length=150, db_column='coursename')
    
    # Restricción: Mínimo 1 crédito por curso
    credits = models.IntegerField(db_column='credits', validators=[MinValueValidator(1, message="Un curso debe tener al menos 1 crédito.")])
    description = models.TextField(blank=True, null=True, db_column='description')
    status = models.BooleanField(default=True, db_column='status')
    
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True, db_column='created')
    modified = models.DateTimeField(auto_now=True, blank=True, null=True, db_column='modified')
    created_id = models.ForeignKey(Users, models.DO_NOTHING, db_column='created_id', blank=True, null=True, related_name='courses_created')
    modified_id = models.ForeignKey(Users, models.DO_NOTHING, db_column='modified_id', blank=True, null=True, related_name='courses_modified')

    class Meta:
        managed = True
        db_table = 'Courses'
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

    def __str__(self):
        return f"{self.coursename} ({self.credits} crt.)"

    def save(self, *args, **kwargs):
        # OPERACIÓN PREVIA: Nombre del curso en MAYÚSCULAS
        if self.coursename:
            self.coursename = self.coursename.upper().strip()
        super().save(*args, **kwargs)