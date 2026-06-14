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

Crear archivo `.env` en la raíz del proyecto (ver `.env.example`):

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

| Variable | Local (`.env`) | Producción (Railway) |
|----------|---------------|---------------------|
| `DATABASE_URL` | Opcional (usar DB_* en su lugar) | Connection string MySQL |
| `DB_USER`, `DB_PASSWORD`, etc. | Obligatorias | No usadas (usar DATABASE_URL) |
| `JWT_SECRET` | Obligatoria | Obligatoria |
| `CORS_ORIGIN` | `http://localhost:5000` | URL del front en Vercel |
| `NUXT_PUBLIC_API_BASE` | No necesaria en desarrollo | URL de la API en Railway |

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

## Flujo de Restablecimiento de Contraseña

1. El usuario hace clic en "¿Olvidaste tu contraseña?" en la pantalla de login.
2. Ingresa su email en el formulario (`forgot-password.vue`) → `POST /auth/forgot-password`.
3. **Backend**: Si el email existe, genera un token de 32 bytes aleatorio con expiración de 1 hora y lo guarda en `password_reset_tokens`. **Siempre responde 200** (sin revelar si el email existe).
4. En **development**, el token se muestra en la consola del backend (`[DEV] Reset token para ...: ...`).
5. En **producción**, el token se enviaría por email (implementación de servicio de correo pendiente).
6. El usuario abre la página de restablecimiento (con el token en la URL) → `reset-password.vue`.
7. Ingresa su nueva contraseña → `POST /auth/reset-password`.
8. Backend verifica token vigente, actualiza la contraseña y marca el token como usado.
9. El usuario redirige al login para iniciar sesión con la nueva contraseña.

## Deploy

### Backend (Railway)
- URL: https://farmacia-carton-pintado-production.up.railway.app
- Las variables de entorno se configuran en el panel de Railway (Settings → Variables), NO en archivo `.env`.
- Ejecutar migraciones en producción: `NODE_ENV=production npm run migrate`

### Frontend (Vercel)
- URL: https://farmacia-carton-pintado.vercel.app
- Variable `NUXT_PUBLIC_API_BASE` configurada en el panel de Vercel apuntando a la URL de la API.
- CORS configurado en backend para aceptar peticiones desde el front desplegado.

## Cambios de esquema (GEN-12)

### AC: Agregar categoría y descripción a Medicamentos
- **Migración**: `20260608000000-add-categoria-descripcion-to-medicamentos.js`
- **Motivo**: Clasificar medicamentos por categoría y agregar descripción detallada para mejor identificación.
- **Campos agregados**: `categoria VARCHAR(100)`, `descripcion TEXT`
- **Impacto**: API retorna los nuevos campos; UI los muestra en tarjetas y formularios.

## Autor

Hugo Medina — Proyecto Final
