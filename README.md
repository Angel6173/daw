# Laboratorio 7-Sistema Académico de Matrículas

## Descripción

Este proyecto consiste en una aplicación web desarrollada con Django para la gestión académica de estudiantes, cursos y matrículas. La aplicación utiliza PostgreSQL como sistema gestor de base de datos, alojado en Supabase, y sigue la arquitectura MVT (Model-View-Template) propuesta por el framework Django.

Entre las funcionalidades implementadas se incluyen:

- Gestión de estudiantes.
- Gestión de cursos.
- Relación de matrículas entre estudiantes y cursos.
- Validaciones personalizadas mediante Validators.
- Administración de datos mediante Django Admin.
- Uso de Class-Based Views (CBV).
- Conexión a una base de datos PostgreSQL remota mediante Supabase.
- Manejo seguro de credenciales utilizando variables de entorno.

---

# Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

- Python 3.x
- Git
- PostgreSQL (opcional si utiliza Supabase)
- Acceso a una instancia de Supabase

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/SantyGutRamos/Laboratorio7_daw.git
cd Laboratorio7
```

## 2. Crear y activar un entorno virtual

### Windows

```bash
python -m venv my_venv
source my_venv/Scripts/activate
```

### Linux / macOS

```bash
python3 -m venv my_venv
source my_venv/bin/activate
```

## 3. Instalar las dependencias

```bash
pip install -r requirements.txt
```

Si el archivo `requirements.txt` no existe, puede generarse mediante:

```bash
pip freeze > requirements.txt
```

---

# Configuración de Variables de Entorno

## 1. Instalar python-dotenv

```bash
pip install python-dotenv
```

## 2. Crear el archivo `.env`

En la raíz del proyecto (al mismo nivel que `manage.py`), crear un archivo denominado `.env` con el siguiente contenido:

```env
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD_SUPABASE
DB_HOST=TU_HOST.supabase.co
DB_PORT=5432

SECRET_KEY=TU_SECRET_KEY_DJANGO
DEBUG=True
```

## 3. Configurar `settings.py`

Asegúrese de que el archivo `settings.py` cargue las variables de entorno:

```python
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG', 'True') == 'True'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
    }
}
```

## 4. Configurar `.gitignore`

Agregar la siguiente línea al archivo `.gitignore` para evitar exponer credenciales sensibles:

```gitignore
.env
```

---

# Verificación y Ejecución

## Verificar la configuración del proyecto

```bash
python manage.py check
```

## Ejecutar el servidor de desarrollo

```bash
python manage.py runserver
```

La aplicación estará disponible en:

```text
http://127.0.0.1:8000/
```

---

# Rutas Disponibles

## Panel de Administración

```text
http://127.0.0.1:8000/admin/
```

## Usuarios

```text
http://127.0.0.1:8000/proyecto/users/
```

## Estudiantes

```text
http://127.0.0.1:8000/proyecto/students/
```

## Cursos

```text
http://127.0.0.1:8000/proyecto/courses/
```

## Matrículas (Cursos - Estudiantes)

```text
http://127.0.0.1:8000/proyecto/courses-students/
```

---

# Tecnologías Utilizadas

- Python 3
- Django
- PostgreSQL
- Supabase
- Python-Dotenv
- HTML
- CSS

---

# Consideraciones de Seguridad

- Las credenciales de acceso a la base de datos no deben almacenarse directamente en el código fuente.
- El archivo `.env` debe mantenerse fuera del repositorio.
- Se recomienda utilizar variables de entorno para toda información sensible del proyecto.

---
