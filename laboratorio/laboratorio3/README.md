# Agenda de Eventos - Laboratorio 03

Aplicación web desarrollada con Node.js y Express que permite gestionar una agenda de eventos personales, almacenándolos de forma persistente en el sistema de archivos.

---

## Contenido

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución del Servidor](#ejecución-del-servidor)
- [Despliegue con Docker](#despliegue-con-docker)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Notas de Uso](#notas-de-uso)

---

## Descripción del Proyecto

Este sistema permite gestionar una agenda personal mediante una interfaz web accesible desde el navegador.

El backend está desarrollado con Node.js y Express, y utiliza el sistema de archivos (`fs`) para almacenar los eventos en archivos Markdown (`.md`), organizados por fecha y hora.

---

## Características

- Crear eventos
- Listar eventos
- Editar eventos
- Eliminar eventos
- Persistencia en archivos Markdown
- Organización jerárquica por fecha
- Interfaz web en una sola página

---

## Requisitos Previos

- Node.js (v18 o superior)
- npm
- Docker (opcional)
- Git

Verificar instalación:

```bash
node -v
npm -v
docker -v
git --version
```

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/SantyGutRamos/Daw_laboratorio3.git
cd Daw_laboratorio3
```

Instalar dependencias:

```bash
npm install
```

---

## Ejecución del Servidor

### Iniciar el servidor

```bash
node app.js
```

O usando script:

```bash
npm start
```

### Acceder a la aplicación

Abrir en el navegador:

```
http://127.0.0.1:8080/lab03
```

---

### Detener el servidor

En la terminal donde se está ejecutando:

```
Ctrl + C
```

---

### Reiniciar el servidor

Simplemente ejecutar nuevamente:

```bash
node app.js
```

---

### Reinicio automático (opcional)

Puedes instalar `nodemon` para reiniciar automáticamente al detectar cambios:

```bash
npm install -g nodemon
nodemon app.js
```

---

## Despliegue con Docker

### Construir imagen

```bash
docker build -t daw_lab03 .
```

### Ejecutar contenedor

```bash
docker run -d -p 8080:8080 --name daw_lab03_contenedor daw_lab03
```

### Acceder

```
http://127.0.0.1:8080/lab03
```

---

### Detener contenedor

```bash
docker stop daw_lab03_contenedor
```

---

### Iniciar nuevamente contenedor

```bash
docker start daw_lab03_contenedor
```

---

### Eliminar contenedor

```bash
docker rm daw_lab03_contenedor
```

---

## Estructura del Proyecto

```
lab03/
├── agenda/              # Archivos de eventos (.md)
├── public/              # Interfaz web
├── app.js               # Servidor
├── Dockerfile           # Configuración Docker
├── package.json         # Dependencias
└── README.md
```

---

## Notas de Uso

- Los eventos se almacenan en la carpeta `agenda/`
- Cada carpeta representa una fecha (`YYYY.MM.DD`)
- Cada archivo representa un evento (`HH.MM.md`)
- El sistema crea automáticamente los directorios necesarios
- Se recomienda validar los datos antes de registrar eventos

---

## Ejemplo de estructura

```
agenda/
└── 2026.04.30/
    ├── 10.00.md
    └── 14.30.md
```

---

## Consideraciones

- No se utiliza base de datos
- La persistencia se realiza mediante archivos
- El sistema es portable mediante Docker

## URL del video
```
https://www.youtube.com/watch?v=Wuiq-vq8P24
```
