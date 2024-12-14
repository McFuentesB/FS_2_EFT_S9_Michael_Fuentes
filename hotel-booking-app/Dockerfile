# Usa una imagen base de Node.js para construir la app
FROM node:20.14 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto Angular
COPY package*.json ./
RUN npm install

COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Usa una imagen ligera de Nginx para servir los archivos
FROM nginx:alpine

# Copia los archivos de construcción al servidor
COPY --from=build /app/dist/hotel-booking-app/browser /usr/share/nginx/html

# Exponer el puerto en el que Nginx sirve la aplicación
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
