# Farmacia Cartón Pintado — Sistema de Gestión Farmacéutica

Sistema completo de gestión para farmacia con inventario, ventas, autenticación JWT y control de recetas médicas.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Node.js + Express |
| ORM | Sequelize 6 |
| Base de datos | MySQL |
| Autenticación | JWT (httpOnly cookie) |
| Frontend | Nuxt 4 (Vue 3) |
| Validación | jsonschema |

## Requisitos previos

- Node.js 18+
- MySQL 8+
- npm

## Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/FARMACIA_CARTON_PINTADO.git
cd FARMACIA_CARTON_PINTADO

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales MySQL

# 3. Instalar dependencias
npm install
cd client && npm install && cd ..

# 4. Crear base de datos
npx sequelize-cli db:create

# 5. Ejecutar migraciones
npm run migrate

# 6. (Opcional) Sembrar datos demo
npx sequelize-cli db:seed:all

# 7. Iniciar servidor
npm run dev
```

## Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=farmacia_carton_pintado
DB_HOST=127.0.0.1
DB_PORT=3306

# Servidor
PORT=4000
NODE_ENV=development
JWT_SECRET=ClaveSecretaFarmacia2026
CORS_ORIGIN=http://localhost:5000
```

## Ejecución

```bash
# Backend (puerto 4000)
npm run dev

# Frontend (puerto 5000)
cd client && npm run dev
```

## Estructura del Proyecto

```
├── server/
│   ├── app.js                  # Punto de entrada Express
│   └── src/
│       ├── controllers/        # Lógica de negocio
│       ├── middlewares/        # Auth, error handler
│       ├── models/            # Modelos Sequelize
│       └── routes/            # Definición de rutas
├── migrations/                # Migraciones Sequelize
├── seeders/                   # Datos de prueba
├── client/                    # Frontend Nuxt 4
│   └── pages/                 # Páginas Vue
├── postman/                   # Colección Postman
├── config/                    # Configuración BD
└── .env.example
```

## API Endpoints

### Auth
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Registro de usuario |
| POST | `/api/v1/auth/login` | Inicio de sesión |
| POST | `/api/v1/auth/logout` | Cierre de sesión |
| GET | `/api/v1/auth/me` | Obtener usuario actual |
| POST | `/api/v1/auth/forgot-password` | Solicitar restablecimiento |
| POST | `/api/v1/auth/reset-password` | Restablecer contraseña |

### Medicamentos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/medicamentos` | Listar (con filtros: ?nombre=&stockMin=) |
| POST | `/api/v1/medicamentos` | Crear |
| PUT | `/api/v1/medicamentos/:id` | Actualizar |
| DELETE | `/api/v1/medicamentos/:id` | Eliminar |
| GET | `/api/v1/medicamentos/alertas-stock` | Alertas de stock bajo |

### Ventas
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/ventas` | Crear venta (transaccional) |
| GET | `/api/v1/ventas/historial` | Historial de ventas |
| GET | `/api/v1/ventas/reporte` | Reporte de ventas |

## Funcionalidades Implementadas

- [x] Autenticación JWT con cookies httpOnly
- [x] CRUD de medicamentos
- [x] Venta transaccional con validación de stock
- [x] Control de receta obligatoria
- [x] Alerta visual de stock bajo
- [x] Búsqueda y filtros de medicamentos
- [x] Restablecimiento de contraseña
- [x] Reporte de ventas
- [x] Carrito persistente en sessionStorage
- [x] Guardia de autenticación por página
- [x] Colección Postman para testing

## Deploy

### Backend (Railway)
- URL: https://farmacia-carton-pintado-production.up.railway.app

### Frontend (Vercel)
- URL: https://farmacia-carton-pintado.vercel.app

## Autor

Hugo Medina — Proyecto Final
