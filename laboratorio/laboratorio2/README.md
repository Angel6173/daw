# Proyecto Docker - Laboratorio 2

Este proyecto contiene tres aplicaciones desplegadas usando contenedores con Docker:

* Calculadora
* Ahorcado
* Registradora

Cada aplicación se encuentra en su propia carpeta y se ejecuta utilizando Docker y Docker Compose.

---

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Docker (incluye Docker Compose)
  https://www.docker.com/products/docker-desktop

---

## Estructura del proyecto

```
proyecto/
│
├── ejercicio01/   # Calculadora
│   ├── Dockerfile
│   └── index.html
│
├── ejercicio02/   # Ahorcado
│   ├── Dockerfile
│   └── index.html
│
├── ejercicio03/   # Registradora
│   ├── Dockerfile
│   └── index.html
│
└── docker_compose.yml
```

---

## Cómo ejecutar el proyecto

1. Clonar el repositorio:

```
git clone https://github.com/SantyGutRamos/Daw_laboratorio2
cd Daw_laboratorio2
```

2. Ejecutar los contenedores:

```
docker compose -f docker_compose.yml up --build
```

---

## Acceso a las aplicaciones

Una vez ejecutado, puedes acceder desde el navegador:

* Calculadora: http://localhost:8080
* Ahorcado: http://localhost:8081
* Registradora: http://localhost:8082

---

## Detener los contenedores

Presiona:

```
Ctrl + C
```

O ejecuta:

```
docker compose -f docker_compose.yml down
```

---

## Notas

* Cada proyecto debe contener un archivo `index.html`
* Si alguna aplicación no carga, verifica que los puertos estén disponibles
* Docker Desktop debe estar en ejecución

---

## Autor

Proyecto desarrollado como parte de un laboratorio académico utilizando Docker.
