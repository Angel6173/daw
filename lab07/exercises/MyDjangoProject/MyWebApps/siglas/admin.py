from django.contrib import admin
from .models.User import Users
from .models.Student import Student
from .models.Courses import Courses
from .models.CoursesStudents import CoursesStudents

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    # 1. Indicamos qué campos se verán en la lista del Admin
    list_display = ('id', 'fathersurname', 'mothersurname', 'names', 'phone', 'created_id', 'modified_id')
    
    # 2. Excluimos los campos de auditoría del formulario para que el usuario no los edite a mano
    exclude = ('created_id', 'modified_id', 'created', 'modified')

    # 3. Este método intercepta el guardado en el Django Admin
    def save_model(self, request, obj, form, change):
        # 'change' es un booleano de Django: 
        # Si es True significa que estamos EDITANDO. Si es False significa que es NUEVO.
        
        # Intentamos buscar el usuario equivalente en tu tabla personalizada 'Users'
        # basándonos en el usuario que inició sesión en el Django Admin (request.user.username)
        try:
            current_user_profile = Users.objects.get(username=request.user.username)
        except Users.DoesNotExist:
            # Si no existe en tu tabla personalizada, usamos el primero disponible o None
            current_user_profile = Users.objects.first()

        if not change:
            # SI ES UN REGISTRO NUEVO:
            # Asignamos quién lo está creando únicamente la primera vez
            obj.created_id = current_user_profile
        else:
            # SI SE ESTÁ EDITANDO UN REGISTRO EXISTENTE:
            # Django ya sabe cuál es su ID original, por lo que NO creará uno nuevo.
            # Solo actualizamos el usuario que lo modificó
            obj.modified_id = current_user_profile

        # Ejecutamos el guardado real de la instancia en Supabase de forma segura
        super().save_model(request, obj, form, change)


@admin.register(Courses)
class CoursesAdmin(admin.ModelAdmin):
    list_display = ('id', 'coursename', 'credits', 'created_id', 'modified_id')
    exclude = ('created_id', 'modified_id', 'created', 'modified')

    def save_model(self, request, obj, form, change):
        try:
            current_user_profile = Users.objects.get(username=request.user.username)
        except Users.DoesNotExist:
            current_user_profile = Users.objects.first()

        if not change:
            obj.created_id = current_user_profile
        else:
            obj.modified_id = current_user_profile

        super().save_model(request, obj, form, change)


@admin.register(CoursesStudents)
class CoursesStudentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'course', 'enrollmentdate', 'created_id', 'modified_id')
    exclude = ('created_id', 'modified_id', 'created', 'modified')

    def save_model(self, request, obj, form, change):
        try:
            current_user_profile = Users.objects.get(username=request.user.username)
        except Users.DoesNotExist:
            current_user_profile = Users.objects.first()

        if not change:
            obj.created_id = current_user_profile
        else:
            obj.modified_id = current_user_profile

        super().save_model(request, obj, form, change)


# Registramos la tabla de usuarios normal por si necesitas gestionarla
@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'status')