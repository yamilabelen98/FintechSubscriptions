FROM node:18-alpine
WORKDIR /app
# Copiar deps e instalar
COPY package*.json ./
RUN npm install
# Copiar el resto y construir
COPY . .
RUN npm run build
# Exponer puerto 3000
EXPOSE 3000
# Comando para lanzar Next en modo production
CMD ["npm", "run", "start"]