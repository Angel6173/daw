# Servidor Web con Docker y Apache

## 1. Descripción

Este proyecto implementa un servidor web utilizando Docker, basado en la imagen de Ubuntu 24.04.
Se ha configurado Apache HTTP Server 2.x junto con dos VirtualHosts independientes: `developers` y `webapp`.

El objetivo es automatizar completamente el despliegue del servidor mediante un Dockerfile, cumpliendo los requisitos establecidos en la guía.

---

## 2. Requisitos

* Docker Desktop instalado
* Sistema operativo Windows, Linux o macOS

---

## 3. Instrucciones de ejecución

### 3.1 Clonar el repositorio

```
git clone https://github.com/Angel6173/daw.git
cd lab-docker
```

### 3.2 Construir la imagen

```
docker build -t mi-servidor .
```

### 3.3 Ejecutar el contenedor

```
docker run -d -p 8080:80 mi-servidor
```

---

## 4. Acceso al servidor

Abrir en el navegador:

```
http://localhost:8080
```

Para utilizar los VirtualHosts:

### Configuración de hosts (Windows)

Editar el archivo:

```
C:\Windows\System32\drivers\etc\hosts
```

Agregar:

```
127.0.0.1 webapp.local
127.0.0.1 developers.local
```

Luego acceder a:

```
http://webapp.local:8080
http://developers.local:8080
```

---


## 5. Gestión del contenedor

### Detener el contenedor

```
docker ps
docker stop <ID>
```

### Eliminar el contenedor

```
docker rm <ID>
```

---

## 6. Autor

Angel Gabriel Hancco Flores
