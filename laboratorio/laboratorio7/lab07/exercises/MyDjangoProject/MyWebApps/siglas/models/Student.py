from django.db import models
from django.core.exceptions import ValidationError  # Para lanzar errores personalizados
from .User import Users

# Función validadora para restringir el formato del teléfono
def validate_only_numbers(value):
    if value and not value.isdigit():
        raise ValidationError('El teléfono solo puede contener dígitos numéricos.')

class Student(models.Model):
    names = models.CharField(max_length=100, db_column='names')
    fathersurname = models.CharField(max_length=100, db_column='fatherSurname')
    mothersurname = models.CharField(max_length=100, db_column='motherSurname')
    gender = models.CharField(max_length=20, blank=True, null=True, db_column='gender')
    address = models.TextField(blank=True, null=True, db_column='address')
    
    # Aplicación del validador personalizado
    phone = models.CharField(max_length=20, blank=True, null=True, db_column='phone', validators=[validate_only_numbers])
    note = models.TextField(blank=True, null=True, db_column='note')
    
    user = models.ForeignKey(Users, models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    status = models.BooleanField(default=True, db_column='status')
    
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True, db_column='created')
    modified = models.DateTimeField(auto_now=True, blank=True, null=True, db_column='modified')
    created_id = models.ForeignKey(Users, models.DO_NOTHING, db_column='created_id', blank=True, null=True, related_name='students_created')
    modified_id = models.ForeignKey(Users, models.DO_NOTHING, db_column='modified_id', blank=True, null=True, related_name='students_modified')

    class Meta:
        managed = True
        db_table = 'Students' 
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return f"{self.fathersurname} {self.mothersurname}, {self.names}"

    def save(self, *args, **kwargs):
        # OPERACIÓN PREVIA: Forzar datos de identidad en MAYÚSCULAS
        if self.names: self.names = self.names.upper().strip()
        if self.fathersurname: self.fathersurname = self.fathersurname.upper().strip()
        if self.mothersurname: self.mothersurname = self.mothersurname.upper().strip()
        super().save(*args, **kwargs)