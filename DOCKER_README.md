# Docker Setup para Lego App

Este proyecto incluye configuración completa de Docker para tanto el frontend (Angular) como el backend (Node.js/Express).

## Estructura del Proyecto

```
lego/
├── lego-app/          # Frontend Angular con SSR
│   ├── Dockerfile     # Producción
│   ├── Dockerfile.dev # Desarrollo
│   └── .dockerignore
├── lego-server/       # Backend API
│   └── Dockerfile
├── docker-compose.yml      # Producción
└── docker-compose.dev.yml  # Desarrollo
```

## Comandos Disponibles

### Producción

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Desarrollo

```bash
# Ejecutar en modo desarrollo con hot reloading
docker-compose -f docker-compose.dev.yml up --build

# Ejecutar en segundo plano
docker-compose -f docker-compose.dev.yml up -d --build
```

## Puertos

- **Frontend (Angular)**: 
  - Producción: `http://localhost:4000`
  - Desarrollo: `http://localhost:4200`
- **Backend (API)**: `http://localhost:3000`

## Características

### Frontend (lego-app)
- ✅ Multi-stage build para optimización
- ✅ Soporte para SSR (Server-Side Rendering)
- ✅ Health checks
- ✅ Usuario no-root para seguridad
- ✅ Hot reloading en desarrollo
- ✅ Optimización de build context con .dockerignore

### Backend (lego-server)
- ✅ Imagen Alpine para menor tamaño
- ✅ Health checks
- ✅ Configuración de producción

### Docker Compose
- ✅ Red interna para comunicación entre servicios
- ✅ Health checks y dependencias
- ✅ Restart policies
- ✅ Configuraciones separadas para desarrollo y producción

## Variables de Entorno

### Frontend
- `NODE_ENV`: `production` o `development`

### Backend
- `NODE_ENV`: `production` o `development`

## Troubleshooting

### Problemas de Build
```bash
# Limpiar caché de Docker
docker system prune -a

# Reconstruir sin caché
docker-compose build --no-cache
```

### Problemas de Permisos
```bash
# En Linux/Mac, ajustar permisos
sudo chown -R $USER:$USER .
```

### Ver Logs de un Servicio Específico
```bash
# Frontend
docker-compose logs -f lego-app

# Backend
docker-compose logs -f lego-server
```

## Desarrollo

Para desarrollo activo, usa el archivo `docker-compose.dev.yml` que incluye:
- Hot reloading para cambios en tiempo real
- Volúmenes montados para el código fuente
- Comandos de desarrollo específicos

## Producción

Para producción, usa `docker-compose.yml` que incluye:
- Builds optimizados
- Health checks
- Configuración de seguridad
- Restart policies
