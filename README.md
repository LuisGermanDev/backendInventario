# API de Gestión de Productos

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

URL: http://localhost:5000/users/register


Body:

ADMINISTRADOR

{
  "nombre": "german",
  "email": "german@gmail.com",
  "password": "12345678",
  "rol": "admin"
}


TECNICO

{
  "nombre": "joel",
  "email": "joel@gmail.com",
  "password": "12345678",
  "rol": "tecnico"
}


# 1.2 Iniciar sesión
Método: POST

URL: http://localhost:5000/users/login

Body:

ADMINISTRADOR

{
  "email": "german@gmail.com",
  "password": "12345678"
}

TECNICO

{
  "email": "joel@gmail.com",
  "password": "12345678"
}

# 1.3 Cerrar sesion

METODO: POST

URL:http://localhost:5000/users/logout


# 2. Items

Metodo: GET

URL: http://localhost:5000/items


[
    {
        "_id": "674b7d970324172b2097f624",
        "nombre": "Router TP-Link",
        "detalle": "Router inalámbrico TP-Link",
        "estado": true,
        "createdAt": "2024-11-30T21:03:19.877Z",
        "updatedAt": "2024-11-30T21:03:19.877Z",
        "__v": 0
    },
    {
        "_id": "674b82ab6a7ca31c6b15a933",
        "nombre": "cable de red",
        "detalle": "clable de red 45",
        "estado": true,
        "createdAt": "2024-11-30T21:24:59.861Z",
        "updatedAt": "2024-11-30T21:24:59.861Z",
        "__v": 0
    }
]

# 3. Reporte

METODO: POST

URL: http://localhost:5000/reportes

{
  "materialesUsados": [
    {
      "id_item": "674b7d970324172b2097f624",
      "cantidad": 5
    }
  ]
}


# 4. Rerportes

METODO: GET

URL: http://localhost:5000/reportes

[
    {
        "_id": "674bc0a861b0cab6ba46a3d2",
        "id_usuario": {
            "_id": "674b8eef87cf836023316615",
            "nombre": "joel",
            "email": "joel@gmail.com"
        },
        "materialesUsados": [
            {
                "id_item": {
                    "_id": "674b7d970324172b2097f624",
                    "nombre": "Router TP-Link"
                },
                "cantidad": 50,
                "_id": "674bc0a861b0cab6ba46a3d3"
            },
            {
                "id_item": {
                    "_id": "674b82ab6a7ca31c6b15a933",
                    "nombre": "cable de red"
                },
                "cantidad": 100,
                "_id": "674bc0a861b0cab6ba46a3d4"
            }
        ],
        "createdAt": "2024-12-01T01:49:28.698Z",
        "updatedAt": "2024-12-01T01:49:28.698Z",
        "__v": 0
    }
]

# 5. Limite o material asignados

Metodo: post

URL: http://localhost:5000/limite

{
  "id_tecnico": "674b8eef87cf836023316615",  // ID del técnico al que se le asigna el límite
  "fecha": "2024-12-01",                     // Fecha del límite asignado
  "materialesAsignados": [
    {
      "id_item": "674b7d970324172b2097f624",  // ID del material
      "cantidadMaxima": 50                    // Cantidad máxima permitida para este material
    },
    {
      "id_item": "674b82ab6a7ca31c6b15a933",  // Otro material
      "cantidadMaxima": 100                   // Límite para este material
    }
  ]
}

# 6. VER LIMITE

Metodo: GET

URL: http://localhost:5000/limite

[
    {
        "_id": "674ba64d786a6ed3cf1f92e6",
        "id_tecnico": {
            "_id": "674b8eef87cf836023316615",
            "nombre": "joel",
            "email": "joel@gmail.com"
        },
        "fecha": "2024-12-01T00:00:00.000Z",
        "materialesAsignados": [
            {
                "id_item": {
                    "_id": "674b7d970324172b2097f624",
                    "nombre": "Router TP-Link"
                },
                "cantidadMaxima": 50,
                "_id": "674ba64d786a6ed3cf1f92e7"
            },
            {
                "id_item": {
                    "_id": "674b82ab6a7ca31c6b15a933",
                    "nombre": "cable de red"
                },
                "cantidadMaxima": 100,
                "_id": "674ba64d786a6ed3cf1f92e8"
            }
        ],
        "createdAt": "2024-11-30T23:57:01.809Z",
        "updatedAt": "2024-11-30T23:57:01.809Z",
        "__v": 0
    }
]
# 7. VER TODOS LOS USUARIOS

METODO: GET

URL: http://localhost:5000/allusers


[
    {
        "_id": "674b7d0c606b5870583faa5b",
        "nombre": "german",
        "email": "german@gmail.com",
        "rol": "admin",
        "__v": 0
    },
    {
        "_id": "674b8eef87cf836023316615",
        "nombre": "joel",
        "email": "joel@gmail.com",
        "rol": "tecnico",
        "__v": 0
    }
]
# 8. CREAR
# 9 ELIIMNAR
# 10 ACTALIZAR
# 11 BUSCAR POR ID USUARIO