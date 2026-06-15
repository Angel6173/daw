from django.shortcuts import render
from django.views import View
from ..models.User import Users

class UserListView(View):
    def get(self, request):
        # Lógica: Filtrar solo usuarios activos
        users = Users.objects.filter(status=True).order_by('username')
        context = {
            'users': users,
            'title': 'LISTADO DE USUARIOS'
        }
        # Retorna la respuesta hacia un template HTML
        return render(request, 'users/user_list.html', context)