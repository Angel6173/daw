# Usar la imagen oficial de Node.js versión 18
FROM node:18-alpine

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de definición de dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm ci --only=production

# Copiar el resto del código fuente de la aplicación
COPY . .

# Exponer el puerto configurado en la aplicación (puerto 8080 según guía o 3000 por defecto)
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]