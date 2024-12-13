# API de Gestión de Productos

## Descripción
Esta aplicacion creada para una empresa de telecomunicaciones de conepcion de cable e internet entre otros en la cual veneficiara en el area de gestion de stock de tecicos , en donde el administrador o el gerente necesita un informe o conocer cuantos trabajos realizan un tecnicos, cuantos materiales gastan en una jornada y que el pueda agregarle una cierta cantidad para que pueda ser usada durente el dia.
con esta informacion el gerente podra anticipar y preparar nueva solicitud para el almacen y poder adquirir nuevo material para el nuevo dia.
optimizando hacie el metodo tradicional de que cada tecnico rellene un formulario a papel y este se entregado el final del dia para que el sercretario traspase todos esos datos a un documento excel y este al fin sea entregado al gerente.
## JUSTIFICACION
### Justificación del Proyecto: API de Gestión de Productos

El desarrollo de la **API de Gestión de Productos** tiene como objetivo optimizar y automatizar la gestión de inventarios y el control de materiales dentro de una empresa de telecomunicaciones, específicamente en el área de gestión de stock para técnicos. La solución proporcionada se enfoca en facilitar la administración de materiales, mejorar la eficiencia en la asignación de recursos y la creación de reportes, eliminando procesos manuales que generan ineficiencias y errores.

#### Necesidad y Problema

En muchas empresas de telecomunicaciones, los técnicos suelen registrar manualmente el uso de materiales durante su jornada laboral en formularios en papel, los cuales deben ser entregados al final del día para ser procesados por el personal administrativo. Este proceso tradicional tiene varias desventajas:
- **Ineficiencia**: El tiempo empleado en completar formularios a mano y luego transcribirlos a una hoja de cálculo es considerable.
- **Errores humanos**: La transcripción manual puede generar errores que afectan la precisión de la información.
- **Retrasos en la toma de decisiones**: Los informes solo se generan al final del día, lo que retrasa las decisiones sobre reabastecimiento de inventarios o la planificación de tareas.

La API propuesta resuelve estos problemas al digitalizar todo el proceso y permitir a los técnicos y gerentes acceder y actualizar información de forma rápida y precisa, en tiempo real.

#### Beneficios

1. **Optimización de procesos**: La API automatiza la gestión de inventarios, eliminando la necesidad de transcribir datos manualmente a Excel. Los técnicos pueden registrar el uso de materiales a través de la interfaz digital, y los gerentes pueden acceder a los reportes de manera inmediata.
   
2. **Acceso en tiempo real**: Los gerentes y administradores pueden obtener información actualizada sobre el uso de materiales por parte de los técnicos y la cantidad de trabajo realizado, lo que facilita la toma de decisiones sobre reposición de inventarios sin tener que esperar al final del día.

3. **Gestión eficiente de inventarios**: La asignación de límites de materiales a los técnicos según sus necesidades diarias permite tener un control más efectivo sobre los recursos disponibles, evitando el desabastecimiento o el exceso de materiales sin usar.

4. **Reducción de errores**: El uso de la API minimiza el riesgo de errores humanos al eliminar la necesidad de escribir y transcribir información a mano. Esto asegura una mayor precisión en los datos y en los reportes generados.

5. **Escalabilidad**: El sistema es escalable, permitiendo la inclusión de más técnicos, materiales y reportes sin complicaciones, lo que es crucial a medida que la empresa crece.

6. **Mejora en la eficiencia operativa**: Al automatizar las tareas repetitivas y tediosas, los técnicos y administradores pueden centrarse en tareas de mayor valor, mejorando la productividad general.

#### Funcionalidad

- **Autenticación y Roles**: El sistema permite la creación de usuarios con distintos roles (Administrador, Técnico), asegurando que solo los usuarios autorizados accedan a ciertas funciones.
  
- **Gestión de Inventarios**: Los administradores pueden agregar, actualizar y eliminar materiales, mientras que los técnicos tienen acceso solo a los materiales que se les asignan para su uso diario.

- **Reportes Detallados**: Los reportes permiten ver el uso de materiales por parte de cada técnico en tiempo real, ayudando al gerente a identificar qué materiales se han utilizado y cuánto queda disponible, lo que facilita la gestión del stock.

- **Límites de Materiales**: Los técnicos tienen asignados límites diarios de materiales, lo que ayuda a evitar el mal uso o desperdicio de los recursos.

#### Implementación

La API está desarrollada utilizando **Node.js** y **MongoDB**. El sistema está diseñado para ser fácil de usar y de configurar en cualquier entorno local, permitiendo a las empresas instalar y poner en marcha el sistema con facilidad.

**Requisitos:**
- Node.js (versión 20 o superior)
- MongoDB (base de datos local)
- Postman o cualquier cliente HTTP para pruebas de la API.

#### Conclusión

Este proyecto es una solución eficiente y moderna para la gestión de materiales en empresas de telecomunicaciones, especialmente en aquellas que manejan equipos y técnicos sobre el terreno. Al optimizar el proceso de gestión de inventarios, la API contribuye a mejorar la productividad, reducir errores, y facilitar la toma de decisiones, lo que se traduce en una mejora general en la eficiencia operativa de la empresa.
PROTOTIPO DEL PRODUCTO FINAL 
Hecho con la herramienta en figma
URL: https://www.figma.com/design/GHF65BnMoKCPNcgKnSnZyI/Untitled?node-id=20-2924&t=TcOCvlArfwenoeEb-1
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
Metodo:POST
URL: http://localhost:5000/allusers

# 9 ELIIMNAR
Metodo:DELETE
URL: http://localhost:5000/allusers/:id

# 10 ACTALIZAR
Metodo:PUT
URL: http://localhost:5000/allusers


# 11 BUSCAR POR ID USUARIO
Metodo:GET
URL: http://localhost:5000/allusers/:id
