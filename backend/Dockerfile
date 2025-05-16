# Imagen base de Node.js (alpine para ser ligero)
FROM node:18-alpine
# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar package.json y package-lock.json
COPY package*.json ./
# Instalar dependencias
RUN npm install
# Copiar el resto del código
COPY . .
# Exponer el puerto (3001 en este caso)
EXPOSE 3001
# Comando por defecto para ejecutar la app
CMD ["node", "index.js"]