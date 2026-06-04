from django.db import models
from django.core.validators import MinLengthValidator  # Validador nativo

class Users(models.Model):
    # Restricción: Nombre de usuario de mínimo 4 caracteres
    username = models.CharField(max_length=50, db_column='username', validators=[MinLengthValidator(4)])
    email = models.CharField(max_length=100, db_column='email')
    password = models.CharField(max_length=255, db_column='password')
    status = models.BooleanField(default=True, db_column='status')
    
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True, db_column='created')
    modified = models.DateTimeField(auto_now=True, blank=True, null=True, db_column='modified')
    
    created_id = models.ForeignKey('self', models.DO_NOTHING, db_column='created_id', blank=True, null=True, related_name='users_created')
    modified_id = models.ForeignKey('self', models.DO_NOTHING, db_column='modified_id', blank=True, null=True, related_name='users_modified')

    class Meta:
        managed = True 
        db_table = 'Users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        # OPERACIÓN PREVIA: Estandarizar el correo a minúsculas y quitar espacios libres
        if self.email:
            self.email = self.email.lower().strip()
        super().save(*args, **kwargs)