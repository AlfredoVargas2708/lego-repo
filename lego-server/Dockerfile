# Utiliza una imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que corre el servidor (ajusta si usas otro)
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]