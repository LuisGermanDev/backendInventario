# API de Gestión de Productos USANDO COOKIES

## Descripción
Esta es una API REST para la gestión de productos, con autenticación de usuarios mediante JWT.
Los usuarios pueden registrarse, iniciar sesión y consultar productos. Los administradores pueden crear, actualizar y eliminar productos,
mientras que los usuarios solo pueden consultar la lista de productos disponibles.

## Requisitos
- Node.js (versión 20 o superior).
- MongoDB (local).
- Postman o cualquier cliente HTTP para hacer pruebas.

## Instalación

1. Clona el repositorio:

   
   [git clone https://github.com/LuisGermanDev/roles.git](https://github.com/LuisGermanDev/backendInventario.git)

2. ingresar al proyecto

   cd roles

3.instalar dependencias

   npm install

4.Revisar la conexion a la base de datos

   Revisar en .env si la cadena de conexion del mongo en la variable de entorno MONGO_URI conincide con la de su equipo

VARIABLES DE ENTORNO
Asegúrate de definir las siguientes variables de entorno en tu archivo .env:

MONGO_URI=mongodb://localhost:27017/tu_base_de_datos
JWT_SECRET=tu_clave_secreta
PORT=5000


5.Correr el server

   node server.js


## PRUEBAS EN POSTMAN

## 1. Autenticación

# 1.1 Registrar un nuevo usuario

Método: POST

URL: http://localhost:5000/api/auth/register


Body:

ADMINISTRADOR

{
  "nombre": "Luis German Quintela Barrientos",
  "email": "german@gmail.com",
  "password": "123456",
  "rol": "admin"
}

USUARIO

{
  "nombre": "Luis  Quintela Barrientos",
  "email": "luis@gmail.com",
  "password": "123456",
  "rol": "usuario"
}

# 1.2 Iniciar sesión
Método: POST

URL: http://localhost:5000/api/auth/login

Body:

ADMINISTRADOR

{
    "email": "german@gmail.com",
    "password": "123456"
}

USUARIO

{
    "email": "luis@gmail.com",
    "password": "123456"
}
# 1.3 Cerrar sesion
el usuario puede cerrar

URL: http://localhost:5000/api/auth/logout


# 2. Productos
2.1 Crear un nuevo producto (solo admin)
Método: POST

URL: http://localhost:5000/api/products

Headers:

ADMINISTRADOR

{
    "nombre": "yogurt",
    "categoria": "lacteos",
    "precio": 10,
    "stock": 100
}

o 
{
    "nombre": "teclado gamer",
    "categoria": "tecnología",
    "precio": 1000,
    "stock": 10
}



# 2.2 Consultar productos (solo usuarios autenticados)
Método: GET

URL: http://localhost:5000/api/products

Headers:

ADMINISTRADOR

Authorization: Bearer <jwt_token>

Respuesta esperada:

[
    {
        "_id": "673e18559d9c3431a37cf4d1",
        "nombre": "teclado gamer",
        "categoria": "tecnología",
        "precio": 1000,
        "stock": 10,
        "createdAt": "2024-11-20T17:11:49.276Z",
        "updatedAt": "2024-11-20T18:12:24.613Z",
        "__v": 0
    },
    {
        "_id": "673e22bc365b5865aad4124e",
        "nombre": "yogurt",
        "categoria": "lacteos",
        "precio": 10,
        "stock": 100,
        "createdAt": "2024-11-20T17:56:12.231Z",
        "updatedAt": "2024-11-20T17:56:12.231Z",
        "__v": 0
    }
]

# 2.3 Actualizar un producto (solo admin)
Método: PUT

URL: http://localhost:5000/api/products/:id

Headers:
Authorization: Bearer <jwt_token>

{
    "nombre": "teclado gamer",
    "categoria": "tecnología",
    "precio": 1001,
    "stock": 10
}



Respuesta esperada:
{
    "message": "Producto actualizado exitosamente",
    "product": {
        "_id": "673e18559d9c3431a37cf4d1",
        "nombre": "teclado gamer",
        "categoria": "tecnología",
        "precio": 1001,
        "stock": 10,
        "createdAt": "2024-11-20T17:11:49.276Z",
        "updatedAt": "2024-11-20T18:12:24.613Z",
        "__v": 0
    }
}

# 2.4 Eliminar un producto (solo admin)
Método: DELETE

URL: http://localhost:5000/api/products/:id

Headers:

Authorization: Bearer <jwt_token>

Respuesta esperada:
{
  "message": "Producto eliminado exitosamente"
}
# Usuario intentando eliminar o crear o actualizar
el usuario no crear eliminar o actualizar solo tendra acceso a ver la lista del productos

Respuesta esperada:
{
    "message": "Acceso denegado, se requiere rol de administrador"
}

