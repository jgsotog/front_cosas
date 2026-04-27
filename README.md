# Frontend CRUD Cosas

Este frontend esta hecho en un solo archivo: [index.html](index.html).

## API actual en uso

Base URL actual:

- `https://crud-cosas-y65y.onrender.com`

En el codigo esta definida en [index.html](index.html) en la constante:

- `const API = 'https://crud-cosas-y65y.onrender.com';`

## Rutas que usa actualmente el frontend

1. Registro
- Metodo: `POST`
- Ruta: `/auth/register`
- Endpoint final: `https://crud-cosas-y65y.onrender.com/auth/register`
- Body JSON:

```json
{
  "nombre": "usuario",
  "email": "prueba@prueba.bo",
  "password": "123"
}
```

2. Login
- Metodo: `POST`
- Ruta: `/auth/login`
- Endpoint final: `https://crud-cosas-y65y.onrender.com/auth/login`
- Body JSON:

```json
{
  "email": "prueba@prueba.bo",
  "password": "123"
}
```

- Respuesta esperada:

```json
{
  "token": "[token]"
}
```

3. Muebles (listar)
- Metodo: `GET`
- Ruta: `/muebles`
- Endpoint final: `https://crud-cosas-y65y.onrender.com/muebles`
- Header requerido:

```http
Authorization: Bearer [token]
```

4. Muebles (crear)
- Metodo: `POST`
- Ruta: `/muebles`
- Endpoint final: `https://crud-cosas-y65y.onrender.com/muebles`
- Headers requeridos:

```http
Content-Type: application/json
Authorization: Bearer [token]
```

- Body JSON:

```json
{
  "nombre": "prueba",
  "tipo": "cocina",
  "costo": "555"
}
```

## Como cambiar la API (paso a paso)

1. Abrir [index.html](index.html).
2. Buscar la linea donde se declara `const API = '...'`.
3. Reemplazar la URL actual por la nueva URL base.

Ejemplo:

```js
const API = 'https://nueva-api.com';
```

4. Verificar si la nueva API mantiene las mismas rutas:
- `/auth/register`
- `/auth/login`
- `/muebles` (GET y POST)

5. Si la nueva API usa rutas distintas, actualizar en [index.html](index.html) los `fetch(...)` correspondientes:
- `fetch(API + '/auth/register', ...)`
- `fetch(API + '/auth/login', ...)`
- `fetch(API + '/muebles', ...)`

6. Si cambia el formato de respuesta (por ejemplo en login o muebles), ajustar el parseo en JS:
- Login espera `data.token`.
- Muebles espera un arreglo directo, o `data.data`, o `data.muebles`.

7. Probar flujo completo:
- Registro
- Login
- Ver listado de muebles
- Crear nuevo mueble

## Notas tecnicas

- El token se guarda en `localStorage` con la clave `token`.
- El email del usuario se guarda con la clave `email`.
- Si `/muebles` responde `401`, el frontend cierra sesion automaticamente.
