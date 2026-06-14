# Planificación — Farmacia Cartón Pintado

## Checklist de Requisitos

### Hito 0 — Inicio del proyecto (no evaluado)

| # | Actividad | Estado |
|---|-----------|--------|
| 1 | Tema confirmado con el docente | ✅ |
| 2 | Repositorio con estructura client/ + API | ✅ |
| 3 | README con alcance y cronograma | ✅ |
| 4 | Informe de inicio entregado | ✅ |
| 5 | Tag `entrega-hito-0` | ✅ |

### Hito 1 — Revisión del 20%

| # | Criterio | Estado |
|---|----------|--------|
| 1 | ≥ 5/23 requisitos desarrollados (matriz) | ✅ (23/23) |
| 2 | GEN-01 a GEN-03 (repo, env, migraciones) | ✅ |
| 3 | rq-01 y rq-02 (modelos dominio) | ✅ |
| 4 | Tag `entrega-hito-1` | ✅ |

### Hito 2 — Revisión del 40%

| # | Criterio | Estado |
|---|----------|--------|
| 1 | ≥ 10/23 requisitos desarrollados (matriz) | ✅ |
| 2 | Auth: registro + login (API+WEB) | ✅ |
| 3 | Al menos 1 flujo de dominio en UI | ✅ (CRUD medicamentos, ventas) |
| 4 | Postman o evidencia API parcial | ✅ |
| 5 | Tag `entrega-hito-2` | ✅ |

### Hito 3 — Entrega final 100% + deploy

| # | Criterio | Estado |
|---|----------|--------|
| 1 | 23/23 requisitos (matriz verificable) | ✅ |
| 2 | Frontend completo (checklist planificación) | ✅ |
| 3 | API + Railway | ⚠️ Caído — requiere redeploy |
| 4 | Front público (Vercel) | ⚠️ Caído — requiere redeploy |
| 5 | Postman completa con auth y errores | ✅ |
| 6 | README ejecutable (local + producción) | ✅ |
| 7 | Demo web en URL pública | ⚠️ Caído |
| 8 | GEN-12 evolución esquema documentada | ✅ |

## Requisitos funcionales — Detalle

### GEN (Generales)

- [x] GEN-01: Estructura del repositorio y README ejecutable
  - README con descripción, stack, instalación, variables, ejecución local
  - .gitignore excluye node_modules, .env, builds
  - Estructura client/ + servidor API
- [x] GEN-02: Variables de entorno y .env.example
  - .env.example presente sin valores secretos reales
  - Documentación de configuración local y producción
- [x] GEN-03: Conexión a BD y migraciones Sequelize
  - 3 migraciones: tablas iniciales, reset tokens, categoria/descripcion
  - README indica comando `npm run migrate`
- [x] GEN-04: Registro de usuario
  - POST /auth/register con bcrypt
  - Pantalla web de registro con validaciones
  - 409 si email duplicado
- [x] GEN-05: Login y emisión JWT
  - POST /auth/login con JWT + cookie httpOnly
  - 401 si credenciales incorrectas
  - Pantalla login web + logout
- [x] GEN-06: Middleware de autenticación
  - Rutas protegidas rechazan sin token (401)
  - Token inválido/expirado → 403
- [x] GEN-07: Restablecer contraseña
  - POST /auth/forgot-password (siempre 200, sin revelar email)
  - POST /auth/reset-password con token + expiración
  - Páginas forgot-password.vue y reset-password.vue
- [x] GEN-08: Manejo centralizado de errores
  - 404 para recurso inexistente
  - 500 sin stack trace en producción
  - Validaciones devuelven 400/422
- [x] GEN-09: CRUD REST y pantallas web
  - Medicamentos: crear, listar, editar, eliminar
  - Ventas: crear (transaccional), historial, reporte
  - Usuarios: registro, perfil
- [x] GEN-10: Validaciones de entrada
  - 400 para campos requeridos faltantes
  - 409 para email duplicado
- [x] GEN-11: Colección Postman
  - Variables de entorno (baseUrl, token)
  - Login automatizable
  - Casos de error: 401, 400, 409
- [x] GEN-12: Evolución de esquema
  - Migración 20260608000000-add-categoria-descripcion-to-medicamentos
  - Documentado en README
- [x] GEN-13: Despliegue
  - Railway: URL configurada, CORS habilitado
  - Vercel: URL configurada, NUXT_PUBLIC_API_BASE

### rq (Requisitos del proyecto)

- [x] rq-01: Login/logout con JWT (usuarios)
- [x] rq-02: CRUD Medicamentos (inventario)
- [x] rq-03: CRUD Ventas
- [x] rq-04: Middleware de autenticación
- [x] rq-05: Reportes de ventas
- [x] rq-06: CRUD Usuarios
- [x] rq-07: Filtros backend (?nombre=, ?stockMin=)
- [x] rq-08: Despliegue Railway
- [x] rq-09: Interfaz web con Vue/Nuxt
- [x] rq-10: Manejo de errores

## Frontend — Páginas implementadas

| Página | Ruta | Funcionalidad |
|--------|------|---------------|
| Login | `/login` | Inicio de sesión JWT |
| Registro | `/register` | Crear cuenta |
| Inicio | `/` | CRUD medicamentos con alertas de stock |
| Dashboard | `/dashboard` | CRUD ventas + carrito |
| Reportes | `/reportes` | Reporte de ventas con 8 métricas |
| Forgot Password | `/forgot-password` | Solicitar restablecimiento |
| Reset Password | `/reset-password` | Ingresar nueva contraseña |

## Backend — Estructura de API

| Método | Ruta | Controlador |
|--------|------|-------------|
| POST | /api/v1/auth/register | authController.register |
| POST | /api/v1/auth/login | authController.login |
| POST | /api/v1/auth/logout | authController.logout |
| GET | /api/v1/auth/me | authController.me |
| POST | /api/v1/auth/forgot-password | authController.forgotPassword |
| POST | /api/v1/auth/reset-password | authController.resetPassword |
| GET | /api/v1/medicamentos | medicamentoController.obtenerMedicamentos |
| POST | /api/v1/medicamentos | medicamentoController.crearMedicamento |
| PUT | /api/v1/medicamentos/:id | medicamentoController.actualizarMedicamento |
| DELETE | /api/v1/medicamentos/:id | medicamentoController.eliminarMedicamento |
| GET | /api/v1/medicamentos/alertas-stock | medicamentoController.alertasStock |
| POST | /api/v1/ventas | ventaController.crearVenta |
| GET | /api/v1/ventas/historial | ventaController.historial |
| GET | /api/v1/ventas/reporte | ventaController.getReporte |
