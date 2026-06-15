# Laboratorio 08 — Django REST Framework

> **Curso:** Desarrollo de Aplicaciones Web (DAW) — Semestre III
> **Escuela:** Ingeniería de Sistemas — UNSA
> **Tema:** API REST con Django REST Framework, serializadores planos y anidados, ViewSets, documentación Swagger.

API REST construida sobre el proyecto Django del laboratorio anterior, que expone el modelo académico (usuarios, docentes, estudiantes, cursos y matrículas) como servicio HTTP consumible por cualquier cliente externo.

---

## Tabla de contenidos
- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Endpoints disponibles](#endpoints-disponibles)
- [Documentación interactiva (Swagger)](#documentación-interactiva-swagger)
- [Ejemplos de uso con curl](#ejemplos-de-uso-con-curl)
- [Arquitectura de serialización](#arquitectura-de-serialización)
- [Integrantes](#integrantes)

---

## Características

-  **CRUD completo** sobre 5 recursos (Users, Teachers, Students, Courses, CoursesStudents)
-  **Serialización dual**: planos para listados/escritura, anidados para consultas de detalle
-  **ViewSets** con selección dinámica de serializador según la acción
-  **Optimización ORM** mediante `select_related` y `prefetch_related` (mitigación del problema N+1)
-  **Permisos anónimos** (`AllowAny`) para pruebas sin JWT
-  **Enrutamiento automático** con `DefaultRouter`
-  **Documentación interactiva** con Swagger UI y ReDoc (drf-spectacular)
-  **Validadores de modelo**: créditos positivos, teléfono mínimo 9 dígitos, etc.
-  **Auditoría**: campos `created`, `modified`, `created_id`, `modified_id` en cada registro

---

## Stack tecnológico

| Componente | Versión |
|------------|---------|
| Python | 3.12+ |
| Django | 6.0.5 |
| Django REST Framework | 3.15.2 |
| drf-spectacular | 0.27.2 |
| PostgreSQL (Supabase) | 16 |
| psycopg2-binary | 2.9.9 |

---

## Estructura del proyecto

```
MyDjangoProject/
├── manage.py
├── requirements.txt
├── .env                          # Variables sensibles (ignorado por Git)
├── .gitignore
├── MyDjangoProject/
│   ├── settings.py               # INSTALLED_APPS + REST_FRAMEWORK + SPECTACULAR
│   └── urls.py                   # path('api/', include(...))
└── MyWebApps/
    └── MyFirstApplication/
        ├── admin.py              # Registro Django Admin
        ├── urls.py               # DefaultRouter + rutas Swagger
        ├── views.py              # 5 ViewSets
        ├── models/
        │   ├── base.py           # BaseModel abstracto (auditoría)
        │   ├── users.py
        │   ├── teachers.py
        │   ├── students.py
        │   ├── courses.py
        │   └── courses_students.py
        └── serializers/
            ├── __init__.py
            ├── UserSerializer.py
            ├── TeacherSerializer.py
            ├── StudentSerializer.py
            ├── CourseSerializer.py
            └── CoursesStudentsSerializer.py
```

---

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/SantyGutRamos/Laboratorio8_daw.git
cd Laboratorio8_daw
```

### 2. Crear y activar el entorno virtual
```bash
# Linux / macOS
python -m venv my_venv
source my_venv/bin/activate

# Windows (Git Bash)
python -m venv my_venv
source my_venv/Scripts/activate

# Windows (CMD)
python -m venv my_venv
my_venv\Scripts\activate.bat
```

### 3. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con las credenciales de Supabase:

```env
DB_NAME=postgres
DB_USER=postgres.tu_proyecto
DB_PASSWORD=tu_contraseña_supabase
DB_HOST=aws-0-region.pooler.supabase.com
DB_PORT=6543
SECRET_KEY=tu_secret_key_de_django
DEBUG=True
```

> ⚠️ **Importante:** El archivo `.env` está incluido en `.gitignore` para evitar exponer credenciales en el repositorio.

### 5. Aplicar migraciones (si es necesario)
```bash
python manage.py migrate
```

### 6. Crear superusuario para Django Admin
```bash
python manage.py createsuperuser
```

---

## Ejecución

```bash
python manage.py runserver
```

El servidor quedará disponible en `http://127.0.0.1:8000/`. Puntos de entrada principales:

| URL | Descripción |
|-----|-------------|
| `http://127.0.0.1:8000/admin/` | Panel administrativo de Django |
| `http://127.0.0.1:8000/api/` | Raíz navegable de la API REST |
| `http://127.0.0.1:8000/api/docs/` | Swagger UI interactivo |
| `http://127.0.0.1:8000/api/redoc/` | Documentación ReDoc |

---

## Endpoints disponibles

| Método | URL | Descripción |
|--------|-----|-------------|
| GET / POST | `/api/users/` | Listar / crear usuarios |
| GET / PUT / DELETE | `/api/users/{id}/` | Detalle / actualizar / eliminar |
| GET / POST | `/api/teachers/` | Listar / crear docentes |
| GET / PUT / DELETE | `/api/teachers/{id}/` | Detalle con User anidado |
| GET / POST | `/api/students/` | Listar / crear estudiantes |
| GET / PUT / DELETE | `/api/students/{id}/` | Detalle con User + cursos matriculados |
| GET / POST | `/api/courses/` | Listar / crear cursos |
| GET / PUT / DELETE | `/api/courses/{id}/` | Detalle con Teacher + alumnos matriculados |
| GET / POST | `/api/courses-students/` | Listar / crear matrículas |
| GET / PUT / DELETE | `/api/courses-students/{id}/` | Detalle con Course + Student anidados |
| GET | `/api/schema/` | Esquema OpenAPI 3.0 (JSON) |
| GET | `/api/docs/` | Swagger UI |
| GET | `/api/redoc/` | ReDoc |

---

## Documentación interactiva (Swagger)

La API genera automáticamente su documentación OpenAPI 3.0 mediante **drf-spectacular**. Una vez levantado el servidor, accede a:

- **Swagger UI:** http://127.0.0.1:8000/api/docs/
- **ReDoc:** http://127.0.0.1:8000/api/redoc/

Desde Swagger UI puedes:
- Ver todos los endpoints agrupados por recurso
- Inspeccionar los esquemas de petición y respuesta
- Ejecutar peticiones reales con el botón **Try it out**

---

## Ejemplos de uso con curl

### Listar todos los cursos
```bash
curl http://127.0.0.1:8000/api/courses/
```

### Crear un curso (POST)
```bash
curl -X POST http://127.0.0.1:8000/api/courses/ \
  -H "Content-Type: application/json" \
  -d '{
    "courseName": "Desarrollo de Aplicaciones Web",
    "credits": 4,
    "description": "Curso de DAW con Django y DRF",
    "teacher_id": "UUID-DEL-DOCENTE"
  }'
```

### Obtener detalle de un curso (incluye Teacher y alumnos anidados)
```bash
curl http://127.0.0.1:8000/api/courses/{UUID-DEL-CURSO}/
```

### Actualizar un curso (PUT)
```bash
curl -X PUT http://127.0.0.1:8000/api/courses/{UUID-DEL-CURSO}/ \
  -H "Content-Type: application/json" \
  -d '{
    "courseName": "DAW Avanzado",
    "credits": 5,
    "description": "Versión actualizada",
    "teacher_id": "UUID-DEL-DOCENTE"
  }'
```

### Eliminar un curso (DELETE)
```bash
curl -X DELETE http://127.0.0.1:8000/api/courses/{UUID-DEL-CURSO}/
```

### Matricular un estudiante a un curso
```bash
curl -X POST http://127.0.0.1:8000/api/courses-students/ \
  -H "Content-Type: application/json" \
  -d '{
    "course": "UUID-DEL-CURSO",
    "student": "UUID-DEL-ESTUDIANTE"
  }'
```

---

## Arquitectura de serialización

Cada modelo expone **dos serializadores** que se seleccionan dinámicamente en el ViewSet según la acción HTTP:

| Acción | Serializador | Comportamiento |
|--------|--------------|----------------|
| `list` (GET sin id) | Plano | Claves foráneas como UUIDs (rápido, listados masivos) |
| `create` (POST) | Plano | Acepta UUIDs para las relaciones |
| `update` (PUT) | Plano | Igual que create |
| `retrieve` (GET con id) | **Anidado** | Embebe los objetos relacionados completos |
| `destroy` (DELETE) | — | No devuelve cuerpo |

### Ejemplo: respuesta plana vs anidada

**GET `/api/courses-students/` (lista — plano)**
```json
[
  {
    "id": "a4d2f1c0-...",
    "course":  "c43ae799-5ad6-4931-a301-7d4c01fbceaf",
    "student": "f51bcd33-1a2b-4c5d-9e8f-7a6b5c4d3e2f",
    "status": "active"
  }
]
```

**GET `/api/courses-students/{id}/` (detalle — anidado)**
```json
{
  "id": "a4d2f1c0-...",
  "course": {
    "id": "c43ae799-...",
    "courseName": "DESARROLLO DE APLICACIONES WEB",
    "credits": 4,
    "description": "Curso de DAW con Django y DRF"
  },
  "student": {
    "id": "f51bcd33-...",
    "names": "JUAN CARLOS",
    "fatherSurname": "PEREZ",
    "motherSurname": "GARCIA",
    "phone": "954123456"
  },
  "status": "active"
}
```

Esta estrategia equilibra **eficiencia** (listados ligeros) y **comodidad de consumo** (detalles autocontenidos), evitando peticiones HTTP en cascada desde el frontend.

---

## Integrantes

| Nombre |
|--------|
| Santiago Cristopher Gutierrez Ramos |
| Angel Gabriel Hancco Flores |
| Matias Hernan Chamana Gonzales |

---

## Licencia

Proyecto académico desarrollado en el marco del curso **Desarrollo de Aplicaciones Web** de la Escuela Profesional de Ingeniería de Sistemas — UNSA, semestre 2026-A.
