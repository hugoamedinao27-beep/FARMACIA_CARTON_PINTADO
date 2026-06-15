# Postman - Farmacia Cartón Pintado API

## Importar la colección

1. Abre Postman
2. File → Import → Upload Files → selecciona `collection.json`
3. La colección `Farmacia Cartón Pintado API` aparecerá en tu sidebar

## Variables de entorno

La colección usa dos variables:

| Variable | Descripción | Default |
|---|---|---|
| `base_url` | URL base de la API | `http://localhost:4000/api/v1` |
| `token` | JWT token (se auto-guarda al hacer login) | (vacío) |

Para producción cambia `base_url` por la URL de tu deploy en Railway.

## Flujo de uso recomendado

1. **Register - Exitoso** → crea un usuario de prueba
2. **Login - Exitoso** → inicia sesión (el token se guarda automáticamente)
3. Ejecuta los requests de **Medicamentos** y **Ventas** en orden
4. Los requests de error (`401`, `404`, `409`, `400`) se pueden ejecutar en cualquier momento

## Cobertura de errores

| Código | Endpoint | Descripción |
|---|---|---|
| 400 | POST /auth/register | Campos vacíos |
| 400 | POST /auth/forgot-password | Email no enviado |
| 401 | POST /auth/login | Credenciales inválidas |
| 401 | GET /auth/me | Sin token |
| 401 | POST /medicamentos | Sin token |
| 401 | POST /ventas | Sin token |
| 404 | GET /medicamentos/:id | ID inexistente |
| 404 | GET /ruta-inexistente | Ruta no encontrada |
| 409 | POST /auth/register | Email duplicado |
